from gradio_client import Client, handle_file
import sys, io, json, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def classify_image(image_path: str):
    space_url = "varshithkumar/wbc-resnet50"
    client = Client(space_url)

    # Correct way: wrap the local path in a dict with key "path"
    result = client.predict(
        image=handle_file(image_path),  # upload file automatically
        api_name="/predict"
    )
    return result


def main():
    #image_path = r"C:\Users\nemal\OneDrive\Desktop\my-app\backend\uploads\1756710647634-377832412-20190526_163027_0.jpg"
    image_path = sys.argv[1]
    #print(os.path.exists(image_path))  # Should print True

    predictions = classify_image(image_path)

    #print("\n Prediction Results:")
    #if isinstance(predictions, dict) and "confidences" in predictions:
    #    for conf in predictions["confidences"]:
    #        print(f"{conf['label']}: {conf['confidence']:.2f}")
    #else:
    print(json.dumps(predictions))

if __name__ == "__main__":
    main()
