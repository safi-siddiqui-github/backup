from typing import Optional
from fastapi import FastAPI, Request,File, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import cv2
import numpy as np
# import torch
# from torchvision import models, transforms
# from PIL import Image
from fastapi.templating import Jinja2Templates
# from fer import FER
import time
# from ultralytics import YOLO



app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
previous_frame = None
# yolo_model = YOLO("yolov8n.pt")  

@app.get("/")
async def root():
    return {"message": "Hello from Safi", "pages": "1 is/, 2 is api /items/55, 3 is web-app /web-page/test, 3: is opencv /face-detection"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id_update_safi": item_id, "q": q}

@app.get("/web-page/{id}", response_class=HTMLResponse)
async def read_item(request: Request, id: str):
    return templates.TemplateResponse(
        request=request, name="index.html", context={"id": id}
    )

@app.get("/face-detection", response_class=HTMLResponse)
async def face_detection(request: Request):
    # Render HTML page with webcam
    return templates.TemplateResponse("face.html", {"request": request})


@app.post("/detect-face")
async def detect_face(file: UploadFile = File(...)):
    image = await file.read()
    nparr = np.frombuffer(image, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    
    return {"faces_detected": len(faces), "faces": faces.tolist()}

# @app.get("/yolo", response_class=HTMLResponse)
# async def yolo_page(request: Request):
#     return templates.TemplateResponse("yolo.html", {"request": request})

# @app.post("/yolo-detect")
# async def yolo_detect(file: UploadFile = File(...)):
#     image = await file.read()
#     nparr = np.frombuffer(image, np.uint8)
#     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#     results = yolo_model(img)[0]

#     detections = []
#     for box in results.boxes:
#         cls = int(box.cls[0])
#         label = results.names[cls]
#         confidence = float(box.conf[0])
#         x1, y1, x2, y2 = box.xyxy[0].tolist()

#         detections.append({
#             "label": label,
#             "confidence": confidence,
#             "box": [x1, y1, x2, y2]
#         })

#     return {"detections": detections}
