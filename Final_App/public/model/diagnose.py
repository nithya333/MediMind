import sys
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from unsloth import FastLanguageModel

# Load the fine-tuned model and tokenizer from the local "model_lora" folder
model_name = "model_lora"
model_lora = AutoModelForCausalLM.from_pretrained(model_name, device_map="auto", low_cpu_mem_usage=True)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Optimize the model for faster inference using Unsloth's FastLanguageModel
FastLanguageModel.for_inference(model_lora)

# Retrieve the user's health query from the Node.js backend
user_query = sys.argv[1]

# Define the prompt style (if any) for formatting the input
prompt_style = """Below is an instruction that describes a task, paired with an input that provides further context. 
Write a response that appropriately completes the request. 
Before answering, think carefully about the question and create a step-by-step chain of thoughts to ensure a logical and accurate response.

### Instruction:
You are a medical expert with advanced knowledge in clinical reasoning, diagnostics, and treatment planning. 
Please answer the following medical question. 

### Question:
{}

### Response:
<think>{}"""

# Tokenize the input query with the prompt format and move to GPU if available
device = "cuda" if torch.cuda.is_available() else "cpu"
inputs = tokenizer([prompt_style.format(user_query, "")], return_tensors="pt").to(device)

# Generate the model's response
outputs = model_lora.generate(
    input_ids=inputs.input_ids,
    attention_mask=inputs.attention_mask,
    max_new_tokens=1200,
    use_cache=True
)

# Decode the generated response to a readable string
response = tokenizer.batch_decode(outputs)

# Extract only the relevant response part
diagnosis = response[0].split("### Response:")[1].strip()

# Output the diagnosis to be captured by the Node.js app
print(diagnosis)
