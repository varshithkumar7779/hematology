
import warnings
warnings.filterwarnings('ignore')
import onnxruntime as ort
import os
import sys
import json
import numpy as np
from PIL import Image

if __name__ == "__main__":
    try:
        x = sys.argv[1]
        x = str(x)
        
        # Load ONNX model
        model_path = r"C:\Users\nemal\OneDrive\Desktop\my-app\backend\model.onnx"
        session = ort.InferenceSession(model_path)
        
        # Get input name
        input_name = session.get_inputs()[0].name
        
        # Create uploads directory if it doesn't exist
        uploads_dir = os.path.join(os.path.dirname(__file__), "uploads")
        if not os.path.exists(uploads_dir):
            os.makedirs(uploads_dir)
            
        dir_path = os.path.join(uploads_dir, x)
        
        if not os.path.exists(dir_path):
            sys.stderr.write(f"Error: File {dir_path} does not exist")
            sys.exit(1)
            
        # Load and preprocess image
        img = Image.open(dir_path).resize((120, 120))
        img_array = np.array(img).astype(np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Run inference
        outputs = session.run(None, {input_name: img_array})
        ans = outputs[0][0][0]  # Assuming single output with sigmoid activation
        
        # Get prediction
        if ans < 0.5:
            result = {"output": "EOSINOPHIL"}
        else:
            result = {"output": "NEUTROPHIL"}
            
        sys.stdout.write(json.dumps(result))
        sys.stdout.flush()
        
    except Exception as e:
        sys.stderr.write(f"Error: {str(e)}")
        sys.exit(1)



app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageName = req.file.filename;
    console.log('Processing image:', imageName);
    
    let result = '';
    // Use path.join for cross-platform compatibility
    const pythonScriptPath = path.join(__dirname, 'dl.py');
    
    const pythonProcess = spawn('python', [pythonScriptPath, imageName]);
    
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python error: ${data}`);
    });
    
    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: 'Python script execution failed' });
      }
      
      try {
        result = JSON.parse(result);
        console.log('Python result:', result);
        
        // Store in database
        await coll_2.insertOne({ image: imageName, result: result.output, date: new Date() });
        
        res.json({ output: result });
      } catch (error) {
        console.error('Error parsing Python result:', error);
        res.status(500).json({ error: 'Failed to process result' });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});