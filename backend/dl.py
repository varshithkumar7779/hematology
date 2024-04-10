import warnings
warnings.filterwarnings('ignore')
import pickle
import tensorflow as tf
import os
import sys
import json
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing import image


os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

x=sys.argv[1]
x=str(x)
clone_model=pickle.load(open(r"C:\Users\nemal\OneDrive\Desktop\my-app\backend\dlmodel","rb"))
dir_path=r"uploads/"+x
img=image.load_img(dir_path,target_size=(120,120,3))
X=image.img_to_array(img)
X=np.expand_dims(X,axis=0)
images=np.vstack([X])
ans=clone_model.predict(images,verbose=0)
if(ans[0][0]<0.5):
    sys.stdout.write(json.dumps({"output": "EOSINOPHIL"}))
else:
    sys.stdout.write(json.dumps({"output": "NEUTROPHIL"}))

sys.stdout.flush()