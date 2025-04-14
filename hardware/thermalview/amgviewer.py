import serial
import time
import numpy as np
import matplotlib.pyplot as plt
import cv2

# --- Setup Serial ---
ser = serial.Serial('COM4', 9600, timeout=1)
time.sleep(2)

# --- Send signal to Arduino to start sending data ---
signal = b"0"
ser.write(signal)
print("Signal sent successfully!")
time.sleep(0.1)

# --- Prepare Display ---
img_path = 'test_img/frame_.png'
fig = plt.figure()
window_name = "my"
cv2.namedWindow(window_name)

# --- Reopen Serial (if needed) ---
ser.close()
ser = serial.Serial('COM4', 9600, timeout=1)
time.sleep(2)

try:
    while True:
        frame_values = []

        while len(frame_values) < 64:
            response = ser.readline().decode().strip()
            print(f"Raw response: {response}")

            # Skip headers or empty lines
            if not response or "Pixels" in response:
                continue

            # Remove brackets and whitespace
            cleaned = response.replace('[', '').replace(']', '')

            try:
                values = [float(val.strip()) for val in cleaned.split(',') if val.strip()]
                frame_values.extend(values)
            except ValueError as e:
                print(f"Line parse error: {e}")
                continue

        if len(frame_values) != 64:
            print(f"Incomplete frame: got {len(frame_values)} values. Skipping.")
            continue

        # Reshape to 8x8
        arr = np.array(frame_values, dtype='float32').reshape(8, 8)

        # Plot and save thermal image
        plt.imshow(arr, cmap='hot', interpolation='nearest')
        plt.colorbar()
        plt.clim(30, 50)
        plt.savefig(img_path)
        plt.clf()

        # Display image using OpenCV
        img = cv2.imread(img_path)
        cv2.imshow(window_name, img)

        key = cv2.waitKey(1)
        if key == 27:  # ESC
            break

finally:
    ser.close()
    cv2.destroyAllWindows()
    print("Serial port closed and resources cleaned up.")
