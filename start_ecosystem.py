"""
ASIRI Luxury Event Management - Ecosystem Master Launcher
Launches:
1. Python FastAPI MongoDB REST API (Port 5000)
2. Standalone User Portal (Port 8080)
3. Standalone Staff Operations Cockpit (Port 8081)
"""

import subprocess
import sys
import time
import os

if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

def start_services():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    print("=" * 60)
    print("ASIRI LUXURY EVENT MANAGEMENT - MASTER ECOSYSTEM LAUNCHER")
    print("=" * 60)

    # 1. Start Python FastAPI MongoDB Backend (Port 5000)
    backend_script = os.path.join(base_dir, "backend", "app.py")
    print("Starting Python MongoDB Backend on http://localhost:5000 ...")
    backend_proc = subprocess.Popen([sys.executable, backend_script], cwd=base_dir)

    time.sleep(1.5)

    # 2. Start User Portal (Port 8080)
    user_dir = os.path.join(base_dir, "asiri-user-portal")
    print("Starting Client / User Portal on http://localhost:8080 ...")
    user_proc = subprocess.Popen([sys.executable, "-m", "http.server", "8080", "--directory", user_dir])

    # 3. Start Staff Portal (Port 8081)
    staff_dir = os.path.join(base_dir, "asiri-staff-portal")
    print("Starting Staff Operations Cockpit on http://localhost:8081 ...")
    staff_proc = subprocess.Popen([sys.executable, "-m", "http.server", "8081", "--directory", staff_dir])

    print("=" * 60)
    print("ALL 3 SERVICES RUNNING!")
    print("Client Website:       http://localhost:8080")
    print("Staff Operations Hub: http://localhost:8081 (PIN: 1234)")
    print("Python MongoDB API:   http://localhost:5000/api")
    print("API Interactive Docs: http://localhost:5000/docs")
    print("=" * 60)
    print("Press Ctrl+C to stop all services.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping all services...")
        backend_proc.terminate()
        user_proc.terminate()
        staff_proc.terminate()
        print("Done.")

if __name__ == "__main__":
    start_services()
