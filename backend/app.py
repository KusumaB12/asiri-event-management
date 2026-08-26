"""
ASIRI Luxury Event Management - Central Python REST API Backend
Powered by FastAPI, MongoDB (PyMongo), and CORS
"""

import os
import sys
import time
import json
from typing import Optional, List, Dict, Any
from contextlib import asynccontextmanager

if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

from fastapi import FastAPI, HTTPException, Query, Body, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import pymongo
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

from seed_data import SEED_EVENTS, SEED_GUESTS, SEED_TIMELINE, SEED_VENDORS, SEED_SHOP_ITEMS, SEED_ORDERS

# Load Environment Variables
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/asiri_events")
PORT = int(os.getenv("PORT", 5000))
DB_NAME = os.getenv("DB_NAME", "asiri_events")

# Global MongoDB and In-Memory Fallback State
mongo_client = None
db = None
is_mongo_connected = False

# In-Memory cache fallback if local MongoDB is not yet started
memory_store = {
    "events": [dict(e) for e in SEED_EVENTS],
    "guests": [dict(g) for g in SEED_GUESTS],
    "timeline": [dict(t) for t in SEED_TIMELINE],
    "vendors": [dict(v) for v in SEED_VENDORS],
    "shop_items": [dict(s) for s in SEED_SHOP_ITEMS],
    "orders": [dict(o) for o in SEED_ORDERS],
    "inquiries": []
}

def init_mongodb():
    global mongo_client, db, is_mongo_connected
    try:
        mongo_client = pymongo.MongoClient(MONGODB_URI, serverSelectionTimeoutMS=2500)
        # Test connection
        mongo_client.admin.command('ping')
        db = mongo_client[DB_NAME]
        is_mongo_connected = True
        print(f"[OK] Connected to MongoDB: {DB_NAME}")
        
        # Seed initial data if collections are empty
        seed_database_if_empty()
    except Exception as e:
        is_mongo_connected = False
        print(f"[WARN] MongoDB connection not active ({e}). Running in resilient In-Memory cache mode.")

def seed_database_if_empty():
    if not is_mongo_connected or db is None:
        return
    try:
        if db.events.count_documents({}) == 0:
            db.events.insert_many([dict(e) for e in SEED_EVENTS])
            print("[INFO] Seeded initial Events in MongoDB.")
        if db.guests.count_documents({}) == 0:
            db.guests.insert_many([dict(g) for g in SEED_GUESTS])
            print("[INFO] Seeded initial Guests in MongoDB.")
        if db.timeline.count_documents({}) == 0:
            db.timeline.insert_many([dict(t) for t in SEED_TIMELINE])
            print("[INFO] Seeded initial Timeline Cues in MongoDB.")
        if db.vendors.count_documents({}) == 0:
            db.vendors.insert_many([dict(v) for v in SEED_VENDORS])
            print("[INFO] Seeded initial Vendors in MongoDB.")
        if db.shop_items.count_documents({}) == 0:
            db.shop_items.insert_many([dict(s) for s in SEED_SHOP_ITEMS])
            print("[INFO] Seeded initial Shop & Rental Items in MongoDB.")
        if db.orders.count_documents({}) == 0:
            db.orders.insert_many([dict(o) for o in SEED_ORDERS])
            print("[INFO] Seeded initial Orders in MongoDB.")
    except Exception as e:
        print(f"[ERROR] Error during seeding: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_mongodb()
    yield
    if mongo_client:
        mongo_client.close()

# Initialize FastAPI App
app = FastAPI(
    title="ASIRI Event Management REST API",
    description="Central MongoDB REST API connecting User Portal and Staff Operations Cockpit",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for all origins so both User and Staff portals connect seamlessly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================================================================
# Helper Serialization Functions
# ==============================================================================
def clean_doc(doc: Dict[str, Any]) -> Dict[str, Any]:
    if not doc:
        return doc
    doc_copy = dict(doc)
    if "_id" in doc_copy:
        doc_copy["_id"] = str(doc_copy["_id"])
    return doc_copy

def clean_docs(docs) -> List[Dict[str, Any]]:
    return [clean_doc(d) for d in docs]

# ==============================================================================
# Pydantic Request Models
# ==============================================================================
class EventCreate(BaseModel):
    title: str
    category: str = "Custom"
    date: str
    time: str = "18:30 IST"
    venue: str
    city: str
    capacity: int = 350
    budget: int = 1500000
    spent: int = 0
    status: str = "Planning"
    image: str = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop"
    description: str = ""
    rsvps: int = 0

class GuestCreate(BaseModel):
    eventId: str
    name: str
    email: str = ""
    tier: str = "General"
    seat: str = "Royal Pavilion"
    dietary: str = "Pure Veg"
    rsvpStatus: str = "Confirmed"
    checkedIn: bool = False

class TimelineCreate(BaseModel):
    eventId: str
    time: str
    title: str
    notes: str = ""
    status: str = "Upcoming"

class VendorCreate(BaseModel):
    eventId: str
    name: str
    category: str = "Mandap & Decor"
    amount: int
    paymentStatus: str = "Pending"
    contact: str = ""

class InquiryCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    city: str = ""
    eventType: str = "Royal Wedding & Sangeet"
    budgetTier: str = "₹50 Lakhs - ₹1 Crore"
    vision: str = ""

class ShopItemCreate(BaseModel):
    title: str
    category: str = "Wedding"
    type: str = "rent"  # rent | buy
    price: int
    priceUnit: str = "/ day"
    securityDeposit: int = 0
    image: str = ""
    shortDescription: str = ""
    features: List[str] = []
    rating: float = 5.0
    reviewsCount: int = 1
    badge: str = ""
    isCustomizable: bool = False
    customizationOptions: Optional[Dict[str, Any]] = None
    inStock: bool = True

class ShopOrderItem(BaseModel):
    itemId: str
    title: str
    category: str = "Wedding"
    type: str = "rent"
    price: int
    quantity: int = 1
    days: int = 1
    securityDeposit: int = 0
    customizations: Optional[Dict[str, Any]] = None
    lineTotal: int

class ShopOrderCreate(BaseModel):
    customerName: str
    phone: str
    email: str = ""
    venue: str = ""
    city: str = ""
    eventDate: str = ""
    items: List[ShopOrderItem]
    subtotal: int
    totalDeposit: int = 0
    gst: int = 0
    totalAmount: int
    paymentMethod: str = "Online UPI / Card"
    notes: str = ""


# ==============================================================================
# API Endpoints
# ==============================================================================

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ASIRI Event Management Python API",
        "database": "MongoDB" if is_mongo_connected else "In-Memory Resilient Cache",
        "mongo_connected": is_mongo_connected,
        "timestamp": time.time()
    }

# ------------------------------------------------------------------------------
# 1. EVENTS ENDPOINTS
# ------------------------------------------------------------------------------
@app.get("/api/events")
def get_events(category: Optional[str] = None, status: Optional[str] = None):
    if is_mongo_connected and db is not None:
        query = {}
        if category and category.lower() != "all":
            query["category"] = category
        if status and status.lower() != "all":
            query["status"] = status
        events = list(db.events.find(query).sort("_id", -1))
        return clean_docs(events)
    else:
        results = memory_store["events"]
        if category and category.lower() != "all":
            results = [e for e in results if e.get("category", "").lower() == category.lower()]
        if status and status.lower() != "all":
            results = [e for e in results if e.get("status", "").lower() == status.lower()]
        return results

@app.post("/api/events", status_code=status.HTTP_201_CREATED)
def create_event(event: EventCreate):
    new_event = event.model_dump()
    new_event["customId"] = f"evt-{int(time.time() * 1000) % 100000}"
    if new_event.get("spent") == 0:
        new_event["spent"] = int(new_event.get("budget", 1500000) * 0.4)

    if is_mongo_connected and db is not None:
        result = db.events.insert_one(new_event)
        new_event["_id"] = str(result.inserted_id)
        return clean_doc(new_event)
    else:
        memory_store["events"].insert(0, new_event)
        return new_event

@app.put("/api/events/{event_id}")
def update_event(event_id: str, updates: Dict[str, Any] = Body(...)):
    if is_mongo_connected and db is not None:
        db.events.update_one({"$or": [{"customId": event_id}, {"_id": event_id}]}, {"$set": updates})
        updated = db.events.find_one({"$or": [{"customId": event_id}, {"_id": event_id}]})
        if not updated:
            raise HTTPException(status_code=404, detail="Event not found")
        return clean_doc(updated)
    else:
        for i, ev in enumerate(memory_store["events"]):
            if ev.get("customId") == event_id or ev.get("id") == event_id:
                memory_store["events"][i].update(updates)
                return memory_store["events"][i]
        raise HTTPException(status_code=404, detail="Event not found")

@app.delete("/api/events/{event_id}")
def delete_event(event_id: str):
    if is_mongo_connected and db is not None:
        res = db.events.delete_one({"$or": [{"customId": event_id}, {"_id": event_id}]})
        # Cascade delete guests, timeline, vendors
        db.guests.delete_many({"eventId": event_id})
        db.timeline.delete_many({"eventId": event_id})
        db.vendors.delete_many({"eventId": event_id})
        return {"success": True, "deleted_count": res.deleted_count}
    else:
        memory_store["events"] = [e for e in memory_store["events"] if e.get("customId") != event_id and e.get("id") != event_id]
        memory_store["guests"] = [g for g in memory_store["guests"] if g.get("eventId") != event_id]
        memory_store["timeline"] = [t for t in memory_store["timeline"] if t.get("eventId") != event_id]
        memory_store["vendors"] = [v for v in memory_store["vendors"] if v.get("eventId") != event_id]
        return {"success": True}

# ------------------------------------------------------------------------------
# 2. GUESTS & 1-CLICK CHECK-IN ENDPOINTS
# ------------------------------------------------------------------------------
@app.get("/api/guests")
def get_guests(eventId: Optional[str] = None):
    if is_mongo_connected and db is not None:
        query = {"eventId": eventId} if eventId and eventId != "all" else {}
        guests = list(db.guests.find(query).sort("_id", -1))
        return clean_docs(guests)
    else:
        if eventId and eventId != "all":
            return [g for g in memory_store["guests"] if g.get("eventId") == eventId]
        return memory_store["guests"]

@app.post("/api/guests", status_code=status.HTTP_201_CREATED)
def add_guest(guest: GuestCreate):
    new_guest = guest.model_dump()
    new_guest["customId"] = f"gst-{int(time.time() * 1000) % 100000}"

    if is_mongo_connected and db is not None:
        result = db.guests.insert_one(new_guest)
        new_guest["_id"] = str(result.inserted_id)
        # Increment RSVP count on event
        db.events.update_one({"$or": [{"customId": guest.eventId}, {"_id": guest.eventId}]}, {"$inc": {"rsvps": 1}})
        return clean_doc(new_guest)
    else:
        memory_store["guests"].insert(0, new_guest)
        for ev in memory_store["events"]:
            if ev.get("customId") == guest.eventId or ev.get("id") == guest.eventId:
                ev["rsvps"] = ev.get("rsvps", 0) + 1
        return new_guest

@app.patch("/api/guests/{guest_id}/checkin")
def toggle_checkin(guest_id: str):
    if is_mongo_connected and db is not None:
        guest = db.guests.find_one({"$or": [{"customId": guest_id}, {"_id": guest_id}]})
        if not guest:
            raise HTTPException(status_code=404, detail="Guest not found")
        new_status = not guest.get("checkedIn", False)
        db.guests.update_one({"_id": guest["_id"]}, {"$set": {"checkedIn": new_status}})
        guest["checkedIn"] = new_status
        return clean_doc(guest)
    else:
        for g in memory_store["guests"]:
            if g.get("customId") == guest_id or g.get("id") == guest_id:
                g["checkedIn"] = not g.get("checkedIn", False)
                return g
        raise HTTPException(status_code=404, detail="Guest not found")

@app.delete("/api/guests/{guest_id}")
def delete_guest(guest_id: str):
    if is_mongo_connected and db is not None:
        guest = db.guests.find_one({"$or": [{"customId": guest_id}, {"_id": guest_id}]})
        if guest:
            db.events.update_one({"$or": [{"customId": guest.get("eventId")}, {"_id": guest.get("eventId")}]}, {"$inc": {"rsvps": -1}})
            db.guests.delete_one({"_id": guest["_id"]})
        return {"success": True}
    else:
        for g in memory_store["guests"]:
            if g.get("customId") == guest_id or g.get("id") == guest_id:
                event_id = g.get("eventId")
                for ev in memory_store["events"]:
                    if (ev.get("customId") == event_id or ev.get("id") == event_id) and ev.get("rsvps", 0) > 0:
                        ev["rsvps"] -= 1
                break
        memory_store["guests"] = [g for g in memory_store["guests"] if g.get("customId") != guest_id and g.get("id") != guest_id]
        return {"success": True}

# ------------------------------------------------------------------------------
# 3. TIMELINE & MUHURAT ENDPOINTS
# ------------------------------------------------------------------------------
@app.get("/api/timeline")
def get_timeline(eventId: Optional[str] = None):
    if is_mongo_connected and db is not None:
        query = {"eventId": eventId} if eventId and eventId != "all" else {}
        timeline = list(db.timeline.find(query))
        return clean_docs(timeline)
    else:
        if eventId and eventId != "all":
            return [t for t in memory_store["timeline"] if t.get("eventId") == eventId]
        return memory_store["timeline"]

@app.post("/api/timeline", status_code=status.HTTP_201_CREATED)
def add_timeline_cue(cue: TimelineCreate):
    new_cue = cue.model_dump()
    new_cue["customId"] = f"cue-{int(time.time() * 1000) % 100000}"

    if is_mongo_connected and db is not None:
        result = db.timeline.insert_one(new_cue)
        new_cue["_id"] = str(result.inserted_id)
        return clean_doc(new_cue)
    else:
        memory_store["timeline"].append(new_cue)
        return new_cue

@app.delete("/api/timeline/{cue_id}")
def delete_timeline_cue(cue_id: str):
    if is_mongo_connected and db is not None:
        db.timeline.delete_one({"$or": [{"customId": cue_id}, {"_id": cue_id}]})
        return {"success": True}
    else:
        memory_store["timeline"] = [t for t in memory_store["timeline"] if t.get("customId") != cue_id and t.get("id") != cue_id]
        return {"success": True}

# ------------------------------------------------------------------------------
# 4. VENDORS & BUDGET MATRIX ENDPOINTS
# ------------------------------------------------------------------------------
@app.get("/api/vendors")
def get_vendors(eventId: Optional[str] = None):
    if is_mongo_connected and db is not None:
        query = {"eventId": eventId} if eventId and eventId != "all" else {}
        vendors = list(db.vendors.find(query))
        return clean_docs(vendors)
    else:
        if eventId and eventId != "all":
            return [v for v in memory_store["vendors"] if v.get("eventId") == eventId]
        return memory_store["vendors"]

@app.post("/api/vendors", status_code=status.HTTP_201_CREATED)
def add_vendor(vendor: VendorCreate):
    new_vendor = vendor.model_dump()
    new_vendor["customId"] = f"vnd-{int(time.time() * 1000) % 100000}"

    if is_mongo_connected and db is not None:
        result = db.vendors.insert_one(new_vendor)
        new_vendor["_id"] = str(result.inserted_id)
        return clean_doc(new_vendor)
    else:
        memory_store["vendors"].append(new_vendor)
        return new_vendor

@app.delete("/api/vendors/{vendor_id}")
def delete_vendor(vendor_id: str):
    if is_mongo_connected and db is not None:
        db.vendors.delete_one({"$or": [{"customId": vendor_id}, {"_id": vendor_id}]})
        return {"success": True}
    else:
        memory_store["vendors"] = [v for v in memory_store["vendors"] if v.get("customId") != vendor_id and v.get("id") != vendor_id]
        return {"success": True}

# ------------------------------------------------------------------------------
# 5. CLIENT CONSULTATION INQUIRIES
# ------------------------------------------------------------------------------
@app.get("/api/inquiries")
def get_inquiries():
    if is_mongo_connected and db is not None:
        inquiries = list(db.inquiries.find().sort("_id", -1))
        return clean_docs(inquiries)
    else:
        return memory_store["inquiries"]

@app.post("/api/inquiries", status_code=status.HTTP_201_CREATED)
def submit_inquiry(inquiry: InquiryCreate):
    new_inquiry = inquiry.model_dump()
    new_inquiry["customId"] = f"inq-{int(time.time() * 1000) % 100000}"
    new_inquiry["createdAt"] = time.strftime("%Y-%m-%d %H:%M:%S")
    new_inquiry["status"] = "New"

    if is_mongo_connected and db is not None:
        result = db.inquiries.insert_one(new_inquiry)
        new_inquiry["_id"] = str(result.inserted_id)
        return clean_doc(new_inquiry)
    else:
        memory_store["inquiries"].insert(0, new_inquiry)
        return new_inquiry

# ------------------------------------------------------------------------------
# 6. SHOPPING & EQUIPMENT RENTALS ENDPOINTS
# ------------------------------------------------------------------------------
@app.get("/api/shop/items")
def get_shop_items(
    category: Optional[str] = None,
    type: Optional[str] = None,
    sort_category: Optional[str] = None,
    search: Optional[str] = None
):
    if is_mongo_connected and db is not None:
        query: Dict[str, Any] = {}
        if category and category.lower() != "all":
            query["category"] = {"$regex": f"^{category}$", "$options": "i"}
        if type and type.lower() != "all":
            query["type"] = type.lower()
        if search and search.strip():
            query["$or"] = [
                {"title": {"$regex": search.strip(), "$options": "i"}},
                {"shortDescription": {"$regex": search.strip(), "$options": "i"}},
                {"category": {"$regex": search.strip(), "$options": "i"}}
            ]
        items = list(db.shop_items.find(query))
        cleaned = clean_docs(items)
    else:
        results = list(memory_store.get("shop_items", []))
        if category and category.lower() != "all":
            results = [s for s in results if s.get("category", "").lower() == category.lower()]
        if type and type.lower() != "all":
            results = [s for s in results if s.get("type", "").lower() == type.lower()]
        if search and search.strip():
            q = search.strip().lower()
            results = [s for s in results if q in s.get("title", "").lower() or q in s.get("shortDescription", "").lower() or q in s.get("category", "").lower()]
        cleaned = results

    # Sort Category Prioritization: if sort_category provided, matching category items appear first!
    if sort_category and sort_category.lower() != "all":
        target = sort_category.lower()
        top_items = [item for item in cleaned if item.get("category", "").lower() == target]
        other_items = [item for item in cleaned if item.get("category", "").lower() != target]
        return top_items + other_items

    return cleaned

@app.post("/api/shop/items", status_code=status.HTTP_201_CREATED)
def create_shop_item(item: ShopItemCreate):
    new_item = item.model_dump()
    new_item["customId"] = f"shop-{int(time.time() * 1000) % 100000}"

    if is_mongo_connected and db is not None:
        result = db.shop_items.insert_one(new_item)
        new_item["_id"] = str(result.inserted_id)
        return clean_doc(new_item)
    else:
        if "shop_items" not in memory_store:
            memory_store["shop_items"] = []
        memory_store["shop_items"].insert(0, new_item)
        return new_item

@app.get("/api/shop/orders")
def get_shop_orders():
    if is_mongo_connected and db is not None:
        orders = list(db.orders.find().sort("_id", -1))
        return clean_docs(orders)
    else:
        return memory_store.get("orders", [])

@app.post("/api/shop/orders", status_code=status.HTTP_201_CREATED)
def create_shop_order(order: ShopOrderCreate):
    new_order = order.model_dump()
    rand_suffix = int(time.time() * 1000) % 100000
    new_order["customId"] = f"ord-{rand_suffix}"
    new_order["orderNumber"] = f"ASIRI-ORD-{rand_suffix}"
    new_order["createdAt"] = time.strftime("%Y-%m-%d %H:%M:%S")
    new_order["status"] = "Confirmed"

    if is_mongo_connected and db is not None:
        result = db.orders.insert_one(new_order)
        new_order["_id"] = str(result.inserted_id)
        return clean_doc(new_order)
    else:
        if "orders" not in memory_store:
            memory_store["orders"] = []
        memory_store["orders"].insert(0, new_order)
        return new_order

@app.patch("/api/shop/orders/{order_id}/status")
def update_order_status(order_id: str, payload: Dict[str, str] = Body(...)):
    new_status = payload.get("status", "Confirmed")
    if is_mongo_connected and db is not None:
        res = db.orders.update_one(
            {"$or": [{"customId": order_id}, {"_id": order_id}, {"orderNumber": order_id}]},
            {"$set": {"status": new_status}}
        )
        if res.matched_count == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        updated = db.orders.find_one({"$or": [{"customId": order_id}, {"_id": order_id}, {"orderNumber": order_id}]})
        return clean_doc(updated)
    else:
        for order in memory_store.get("orders", []):
            if order.get("customId") == order_id or order.get("id") == order_id or order.get("orderNumber") == order_id:
                order["status"] = new_status
                return order
        raise HTTPException(status_code=404, detail="Order not found")

@app.delete("/api/shop/orders/{order_id}")
def delete_order(order_id: str):
    if is_mongo_connected and db is not None:
        db.orders.delete_one({"$or": [{"customId": order_id}, {"_id": order_id}, {"orderNumber": order_id}]})
        return {"success": True}
    else:
        memory_store["orders"] = [o for o in memory_store.get("orders", []) if o.get("customId") != order_id and o.get("orderNumber") != order_id]
        return {"success": True}

# ------------------------------------------------------------------------------
# 7. EXECUTIVE KPI STATS
# ------------------------------------------------------------------------------
@app.get("/api/stats")
def get_stats():
    events = get_events()
    guests = get_guests()
    timeline = get_timeline()
    vendors = get_vendors()
    orders = get_shop_orders()
    shop_items = get_shop_items()

    active_events = [e for e in events if e.get("status") in ["Live", "Production"]]
    total_budget = sum(e.get("budget", 0) for e in events)
    total_spent = sum(v.get("amount", 0) for v in vendors)
    checked_in_count = sum(1 for g in guests if g.get("checkedIn"))
    total_order_rev = sum(o.get("totalAmount", 0) for o in orders)

    return {
        "totalEvents": len(events),
        "activeEvents": len(active_events),
        "totalGuests": len(guests),
        "checkedInGuests": checked_in_count,
        "checkInRate": round((checked_in_count / max(len(guests), 1)) * 100, 1),
        "totalBudget": total_budget,
        "totalSpent": total_spent,
        "variance": total_budget - total_spent,
        "totalTimelineCues": len(timeline),
        "totalVendors": len(vendors),
        "totalShopItems": len(shop_items),
        "totalShopOrders": len(orders),
        "shopRevenue": total_order_rev
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)

