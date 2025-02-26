# MediMind
An AI-Powered Medical Diagnostic Assistant

This project uses a fine-tuned **LLM** (**DeepSeek-R1-Distill-Llama-8B**) to analyze medical queries and provide diagnostic insights. The backend is built with **Node.js**, and the frontend uses **HTML/CSS/JavaScript** for a simple user interface.  

---
## Key Features
- Interpreting Patient Symptoms: Analyzing user-inputted symptoms and patient history through natural language processing.
- Generating Accurate Diagnoses: Utilizing a structured, clinical reasoning approach based on a medical reasoning dataset.
- Enhancing Clinical Decision Support: Providing detailed diagnostic outputs with step-by-step thought processes for transparency and trust.


## Implementation Details
1. LLM Model: Fine-tune the LLM DeepSeek-R1-Distill-Llama-8B using LoRA (Low-Rank Adaptation) for enhanced clinical reasoning due to its robust natural language understanding and generation capabilities, combined with its ability to handle complex medical reasoning.

2. Data Handling: The medical dataset used for fine-tuning the “FreedomIntelligence/medical-o1-reasoning-SFT” dataset has 500 medical Q&A pairs and is used for training. This dataset is constructed using GPT-4o, which searches for solutions to verifiable medical problems and validates them through a medical verifier. 

3. Fine-tuning the LLM: The training process involves fine-tuning the DeepSeek-R1-Distill-Llama-8B model using the SFTTrainer with the FreedomIntelligence/medical-o1-reasoning-SFT dataset. The LoRA (Low-Rank Adaptation) approach adapts the model specifically for clinical reasoning by training on 500 medical Q&A pairs. The SFTTrainer uses a small batch size with gradient accumulation to optimize memory usage. Training utilises AdamW 8-bit optimizer and FP16/BF16 precision to reduce GPU memory load. This approach offers memory efficiency, quick convergence, and scalable fine-tuning, allowing the model to generate accurate medical diagnostics efficiently.

---

## 🚀 Project Structure 

medical-diagnostic-ai-assistant/ 

├── backend/ # Node.js backend server 

│ ├── diagnose.py # Python script to load and run the model 

│ ├── app.js # Node.js backend logic 

│ ├── model_lora/ # Folder containing the fine-tuned LLM model 

│ ├── package.json # Backend dependencies 

│ └── requirements.txt # Python dependencies 

├── frontend/

│ ├── index.html # Frontend HTML file 

│ ├── styles.css # Frontend CSS styling 

│ └── app.js # Frontend JavaScript 

└── README.md # Project documentation


---

## 🛠️ **Setup and Installation**  

### 1. **Clone the Repository:**  
```bash
git clone <repository_url>
cd medical-diagnostic-ai-assistant
```

### 2. Set Up Python Environment for Model Inference:
Create a Virtual Environment and Install Dependencies:
``` bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python packages
pip install -r requirements.txt
```

requirements.txt file:
``` bash
transformers
torch
unsloth
flask
```

### 3. Install Node.js Dependencies:
```bash
# Ensure you're still in the backend directory
npm install
```

## ▶️ Running the Application
### 1. Start the Backend Server:
```bash
# Run the Python backend for model inference
python3 diagnose.py
```

```bash
# Run the Node.js server
node app.js
```
### 2. Open the Frontend:
Open index.html in your browser or run a local server (e.g., Live Server in VSCode).

### 3. Test the Application:
Enter a medical query in the frontend interface and receive diagnostic insights from the model.

## Results
#### Training Loss Progression

|   Step   |   Training Loss   |
|----------|-------------------|
| 10       | 1.918800          |
| 20       | 1.461500          |
| 30       | 1.402300          |
| 40       | 1.308800          |
| 50       | 1.344300          |
| 60       | 1.314000          |

This is the training loss curve from "Weights and Biases"

![W B Chart 26_02_2025, 11_43_07](https://github.com/user-attachments/assets/5c3ab8b0-8ea2-46b6-8dfd-0c4a3e5982b2)


#### Sample Query
```bash
A 61-year-old woman with a long history of involuntary urine loss during activities like coughing or sneezing but no leakage at night undergoes a gynecological exam and Q-tip test. Based on these findings, what would cystometry most likely reveal about her residual volume and detrusor contractions?
```

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
