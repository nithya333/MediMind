# MediMind
An AI-Powered Medical Diagnostic Assistant

This project uses a fine-tuned **LLM** (DeepSeek-R1-Distill-Llama-8B) to analyze medical queries and provide diagnostic insights. The backend is built with Node.js, and the frontend uses HTML/CSS/JavaScript for a simple user interface.  

---
## Key Features
- Interpreting Patient Symptoms: Analyzing user-inputted symptoms and patient history through natural language processing.
- Generating Accurate Diagnoses: Utilizing a structured, clinical reasoning approach based on a medical reasoning dataset.
- Enhancing Clinical Decision Support: Providing detailed diagnostic outputs with step-by-step thought processes for transparency and trust.


## Implementation Details
1. LLM Model: Fine-tune the LLM DeepSeek-R1-Distill-Llama-8B using LoRA (Low-Rank Adaptation) for enhanced clinical reasoning due to its robust natural language understanding and generation capabilities, combined with its ability to handle complex medical reasoning.

2. Data Handling: The medical dataset used for fine-tuning the “FreedomIntelligence/medical-o1-reasoning-SFT” dataset has 500 medical Q&A pairs and is used for training. This dataset is constructed using GPT-4o, which searches for solutions to verifiable medical problems and validates them through a medical verifier. 

3. Fine-tuning the LLM: The training process involves fine-tuning the DeepSeek-R1-Distill-Llama-8B model using the SFTTrainer with the FreedomIntelligence/medical-o1-reasoning-SFT dataset. The LoRA (Low-Rank Adaptation) approach adapts the model specifically for clinical reasoning by training on 500 medical Q&A pairs. The SFTTrainer uses a small batch size with gradient accumulation to optimize memory usage. Training utilises AdamW 8-bit optimizer and FP16/BF16 precision to reduce GPU memory load. This approach offers memory efficiency, quick convergence, and scalable fine-tuning, allowing the model to generate accurate medical diagnostics efficiently.

## Model Training Results

#### Training Loss Progression

|   Step   |   Training Loss   |
|----------|-------------------|
| 10       | 1.918800          |
| 20       | 1.461500          |
| 30       | 1.402300          |
| 40       | 1.308800          |
| 50       | 1.344300          |
| 60       | 1.314000          |

This is the training loss curve through _Weights and Biases_

<img src="https://github.com/user-attachments/assets/5c3ab8b0-8ea2-46b6-8dfd-0c4a3e5982b2" alt="W B Chart" height="300">

---

## 🚀 Project Structure 

```
MediMind/ 
├─ Final_App/
│ ├─ public/
│ │ ├─ model/
│ │ │ ├─ model_lora/             # Fine-tuned LLM model directory
│ │ │ ├─ diagnose.py             # Python script for model inference
│ │ │ │ │ ├─ index.html           # Frontend HTML file
│ │ └─ index.js                   # JavaScript for frontend-backend integration
│ │ │ ├─ package-lock.json         # Auto-generated dependency tree
│ ├─ package.json                  # Node.js project metadata and dependencies
│ ├─ MediMind_LLMFine-tuning.ipynb # Jupyter notebook for fine-tuning the model
│ ├─ requirements.txt               # Install Dependencies
│ └─ README.md                     # Project documentation
```

---

## 🛠️ Setup and Installation  

### 1. Clone the Repository:  
```bash
git clone "https://github.com/nithya333/MediMind.git"
cd MediMind
```

### 2. Set Up Python Environment for Model Inference:
Create a Virtual Environment and Install Dependencies:
``` bash
cd backend
python3 -m venv venv
source venv/bin/activate 

# Install Python packages
pip install -r requirements.txt
```

### 3. Install Node.js Dependencies:
```bash
npm install
```

### 4. Setting up the LLM
Due to the size limitations of GitHub upload, the _adapter_model.safetensors_ is uploaded on Google Drive at :
https://drive.google.com/file/d/1T1DYOLlb-q-1pAmc2L7zBrjP-6YDqvlP/view?usp=sharing

Download this file and keep it in this directory 
`````
/MediMind/Final_App/public/model/model_lora
`````

---

## Running the Application
### 1. Direct model inferencing:
```bash
# Run the Python backend for model inference
python3 diagnose.py "user-query"
```
The input to this diagnose.py is the user health condition query and the output is the LLM medical response.

### 2. Web Interface:
```bash
npm start
```
Open the localhost URL appearing after npm start in your browser.

---

## Results

#### Sample Query
```bash
A 61-year-old woman with a long history of involuntary urine loss during activities like coughing or sneezing but no leakage at night undergoes a gynecological exam and Q-tip test. Based on these findings, what would cystometry most likely reveal about her residual volume and detrusor contractions?
```
<img src="https://github.com/user-attachments/assets/f4ebc538-a3f6-46ae-b789-156f995a99f6" alt="W B Chart" height="350">

#### Sample Response:
Chain of Thought
`````
Okay, so let's think about this. We have a 61-year-old woman who's been dealing with involuntary urine loss during things like coughing or sneezing, but she's not leaking at night. That suggests she might have some kind of problem with her pelvic floor muscles or maybe her bladder.

Now, she's got a gynecological exam and a Q-tip test. Let's break that down. The Q-tip test is usually used to check for urethral obstruction. If it's positive, that means there's something blocking the urethra, like a urethral stricture or something else.

If she's experiencing involuntary loss during activities, like coughing, it might mean her pelvic floor muscles aren't working properly. They might not be contracting when they should to support the bladder. This could lead to a problem with the urethral sphincter, which controls the release of urine.

But let's not jump to conclusions. It's important to look at what's happening in the bladder. We need to know about her residual volume and detrusor contractions. These are key factors in understanding how her bladder is functioning.

If her bladder's capacity is low, that could mean she doesn't have enough space to hold the urine, leading to frequent urination. If her detrusor contractions are weak, that might explain why she's not able to hold her urine during activities.

Now, let's think about cystometry. This test is crucial because it gives us direct insights into the bladder's function. It can show how much residual volume the bladder holds and how strong the contractions are.

If her bladder's capacity is low, it would mean she's holding less urine, which could explain why she's experiencing these involuntary losses. And if her detrusor contractions are weak, that would support the idea that her pelvic floor muscles aren't working as they should.

Putting it all together, if she has a low bladder capacity, her bladder can't hold much urine. And if her detrusor contractions are weak, she might not be able to hold the urine until she can get to a toilet. This combination would likely mean her bladder is underactive and not effectively controlling the release of urine, leading to the involuntary losses she's experiencing.

So, based on her symptoms and the Q-tip test, it's reasonable to expect that her cystometry would show a low residual volume and weak detrusor contractions. These findings would align with the idea that she's struggling with bladder control due to weak pelvic floor muscle function and a limited bladder capacity.
`````
<img src="https://github.com/user-attachments/assets/877053fc-cbbd-44de-a03b-894878de9020" alt="W B Chart" height="350">

Final Response:
`````
Based on the 61-year-old woman's symptoms of involuntary urine loss during activities like coughing or sneezing, and the results from her Q-tip test, it is most likely that her cystometry will reveal a low residual volume and weak detrusor contractions. These findings suggest that her bladder's capacity is limited and that her detrusor contractions, which are crucial for bladder emptying, are not functioning properly. This combination of low bladder capacity and weak detrusor contractions aligns with the symptoms of a weak pelvic floor muscle function, which could be contributing to her involuntary urine loss.
`````

---

## References and Acknowledgements
Dataset: FreedomIntelligence/medical-o1-reasoning-SFT
https://huggingface.co/datasets/FreedomIntelligence/medical-o1-reasoning-SFT

Model: DeepSeek-R1-Distill-Llama-8B
https://huggingface.co/unsloth/DeepSeek-R1-Distill-Llama-8B

Other references:
https://openmedscience.com/artificial-intelligence-in-healthcare-revolutionising-diagnosis-and-treatment/
https://www.datacamp.com/tutorial/fine-tuning-deepseek-r1-reasoning-model 
