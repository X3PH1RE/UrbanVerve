import cv2
import torch
import numpy as np
from tracker import *

model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

cap = cv2.VideoCapture('video.mp4')

ret, frame = cap.read()
row, col, _ = frame.shape

count = 0
tracker = Tracker()

cv2.namedWindow('FRAME')

area = [(317, 127), (544, 134), (775, 599), (39, 599)]
roi = set()

# Open the output file for writing
with open('output.txt', 'w') as output_file:
    while True:
        ret, frame = cap.read()
        frame = frame[350: row, 170: col]
        if not ret:
            break
        count += 1
        if count % 3 != 0:
            continue
        frame = cv2.resize(frame, (1020, 600))

        results = model(frame)

        list = []
        for index, rows in results.pandas().xyxy[0].iterrows():
            x = int(rows[0])
            y = int(rows[1])
            x1 = int(rows[2])
            y1 = int(rows[3])
            b = str(rows['name'])
            list.append([x, y, x1, y1])
        idx_bbox = tracker.update(list)
        for bbox in idx_bbox:
            x2, y2, x3, y3, id = bbox
            cv2.rectangle(frame, (x2, y2), (x3, y3), (0, 0, 255), 2)
            cv2.putText(frame, str(id), (x2, y2), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            cv2.circle(frame, (x2, y3), 4, (0, 255, 0), -1)
            result = cv2.pointPolygonTest(np.array(area, np.int32), (x3, y3), False)
            if result > 0:
                roi.add(id)

        cv2.polylines(frame, [np.array(area, np.int32)], True, (255, 0, 0), 2)
        a1 = len(roi)
        print(a1)
        cv2.putText(frame, str(a1), (877, 32), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        # Write the output to the file
        output_file.write(f"{a1}\n")

        cv2.imshow("FRAME", frame)
        if cv2.waitKey(0) & 0xFF == 27:
            break


cap.release()
cv2.destroyAllWindows()
