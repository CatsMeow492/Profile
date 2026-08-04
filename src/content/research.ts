import { Research } from '@/types/content';

// Every entry here must be backed by a public repository that a reader can open.
// Removed 2026-08-04: three entries claiming PUBLISHED status at NeurIPS 2023, ACL 2023 and ICLR 2022.
// They had placeholder co-authors, DOIs that either 404'd or resolved to an unrelated team's paper,
// and "Download PDF" links to /papers/*.pdf files that were never in the repo. Nothing backed them.
export const research: Research[] = [
  {
    id: 'quantization-bounds-lora-2024',
    title: 'Theoretical Analysis of Quantization Bounds in LoRA Fine-tuning: Error Propagation and Optimal Bit-width Selection',
    authors: ['Taylor Mohney'],
    venue: 'Self-published preprint',
    year: 2024,
    abstract: `We present a comprehensive theoretical analysis of quantization error bounds in Low-Rank Adaptation (LoRA) fine-tuning.
               Our work establishes fundamental error bounds E[L(θ̂_q)] - L(θ*) ≤ Õ(√r/√N) + O(r·2^(-2b)σ_g²) and derives
               an optimal bit-width selection rule b* ≥ ½log₂(r) + ½log₂(N) + C. Through systematic experiments on DialoGPT
               fine-tuning, we demonstrate strong theory-practice agreement (R>0.9) and provide practical guidelines:
               use 8-bit for ranks ≤16, 16-bit for higher ranks, avoid 4-bit for ranks >8. Our analysis reveals
               exponential bit-width scaling requirements and rank-precision coupling effects previously unexplored in the literature.`,
    pdfUrl: 'https://github.com/CatsMeow492/llm-quantization-bounds/blob/master/quantization-bounds-paper.pdf',
    category: 'quantization',
    keywords: ['quantization', 'LoRA', 'fine-tuning', 'theoretical analysis', 'error bounds'],
    status: 'preprint'
  },
  {
    id: 'adaptive-lora-placement-2024',
    title: 'Adaptive LoRA Placement for Efficient Large Language Model Fine-tuning',
    authors: ['Taylor Mohney'],
    venue: 'Working draft',
    year: 2024,
    abstract: `This paper introduces a novel approach to adaptive placement of Low-Rank Adaptation (LoRA) modules in large language models.
               We develop algorithmic strategies for determining optimal layer positions for LoRA adapters based on gradient analysis
               and activation patterns. Our method achieves superior parameter efficiency while maintaining or improving fine-tuning
               performance across multiple benchmarks. The adaptive placement strategy reduces the number of trainable parameters
               by up to 40% compared to uniform LoRA placement while achieving comparable or better downstream task performance.`,
    pdfUrl: 'https://github.com/CatsMeow492/adaptive-lora-placement/blob/master/paper/draft.md',
    category: 'optimization',
    keywords: ['LoRA', 'adaptive placement', 'parameter efficiency', 'fine-tuning', 'large language models'],
    status: 'draft'
  },
  {
    id: 'parameter-efficient-fine-tuning-2024',
    title: 'Parameter-Efficient Fine-tuning of Large Models: A Comprehensive Analysis',
    authors: ['Taylor Mohney'],
    venue: 'Working draft',
    year: 2024,
    abstract: `We present a comprehensive analysis of parameter-efficient fine-tuning methods for large language models,
               examining the trade-offs between computational efficiency, memory usage, and downstream task performance.
               Our study compares LoRA, AdaLoRA, QLoRA, and other PEFT methods across diverse tasks and model architectures.
               We provide theoretical insights into why certain methods excel in specific scenarios and offer practical
               guidelines for method selection based on computational constraints and performance requirements. Our empirical
               evaluation spans multiple model sizes from 125M to 175B parameters.`,
    pdfUrl: 'https://github.com/CatsMeow492/parameter-efficient-fine-tuning-of-large-models/blob/master/papers/arxiv_draft.md',
    category: 'machine-learning',
    keywords: ['parameter efficiency', 'fine-tuning', 'PEFT', 'large language models', 'computational efficiency'],
    status: 'draft'
  }
];
