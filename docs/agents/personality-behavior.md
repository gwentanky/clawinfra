# Caching and Optimization

Learn how to define and fine-tune your agent's caching and optimization patterns.

## Overview

An agent's personality determines how it communicates, makes decisions, and interacts with users. ClawInfra provides a flexible system for defining nuanced personalities.

## Personality Configuration

### Basic Structure

```json
{
  "personality": {
    "traits": ["helpful", "analytical", "patient"],
    "style": "professional yet approachable",
    "tone": "warm and supportive",
    "adjectives": ["knowledgeable", "reliable", "innovative"]
  }
}
```

### Personality Traits

Common personality traits and their effects:

| Trait | Behavior Pattern |
|-------|-----------------|
| **helpful** | Proactively offers assistance, provides detailed explanations |
| **analytical** | Data-driven responses, logical reasoning |
| **creative** | Unique perspectives, innovative solutions |
| **patient** | Thorough explanations, willing to repeat |
| **friendly** | Warm greetings, casual language |
| **professional** | Formal tone, business-appropriate |
| **empathetic** | Emotional awareness, supportive responses |
| **humorous** | Light jokes, playful interactions |
| **direct** | Concise, straight-to-the-point answers |
| **curious** | Asks clarifying questions, explores topics deeply |

### Communication Style

Define how your agent communicates:

```json
{
  "personality": {
    "style": "conversational and engaging",
    "verbosity": "moderate",
    "formality": "casual",
    "emoji_usage": false
  }
}
```

**Style Options:**
- **Conversational**: Natural, friendly dialogue
- **Professional**: Business-appropriate communication
- **Technical**: Precise, detailed explanations
- **Educational**: Teaching-focused, patient
- **Casual**: Relaxed, informal

### Tone Settings

```json
{
  "personality": {
    "tone": "enthusiastic and encouraging",
    "sentiment": "positive",
    "confidence": "high"
  }
}
```

## Behavioral Patterns

### Response Guidelines

```json
{
  "responseGuidelines": {
    "maxLength": 280,
    "preferredLength": 150,
    "useEmojis": false,
    "useHashtags": true,
    "mentionUsers": true,
    "includeLinks": true,
    "formatting": "markdown"
  }
}
```

### Decision-Making

Configure how your agent makes decisions:

```json
{
  "decisionMaking": {
    "riskTolerance": "moderate",
    "prioritization": ["accuracy", "speed", "completeness"],
    "conflictResolution": "seek_consensus"
  }
}
```

### Interaction Patterns

```json
{
  "interactionPatterns": {
    "greeting": "warm",
    "farewell": "friendly",
    "errorHandling": "apologetic_and_helpful",
    "uncertainty": "honest",
    "disagreement": "respectful"
  }
}
```

## Message Templates

### Greeting Templates

```json
{
  "messageTemplates": {
    "greeting": [
      "Hello! How can I assist you today?",
      "Hi there! What brings you here?",
      "Greetings! What can I help you with?"
    ]
  }
}
```

### Context-Aware Responses

```json
{
  "messageTemplates": {
    "firstInteraction": [
      "Welcome! I'm {name}, and I'm here to help with {expertise}."
    ],
    "returningUser": [
      "Good to see you again! How can I help you today?"
    ],
    "uncertainty": [
      "I'm not entirely sure about that. Let me research it for you.",
      "That's an interesting question. I need to verify the details."
    ],
    "error": [
      "I apologize for the confusion. Let me try that again.",
      "Something went wrong on my end. Give me a moment to fix this."
    ]
  }
}
```

## Behavioral Rules

### Dos and Don'ts

```json
{
  "rules": {
    "always": [
      "Be respectful and professional",
      "Admit when you don't know something",
      "Provide sources when making claims",
      "Ask clarifying questions when needed"
    ],
    "never": [
      "Use offensive language",
      "Make up information",
      "Share personal user data",
      "Engage in harmful activities"
    ]
  }
}
```

### Conditional Behavior

```json
{
  "conditionalBehavior": {
    "when_frustrated_user": {
      "tone": "extra_patient",
      "verbosity": "concise",
      "action": "offer_human_support"
    },
    "when_technical_query": {
      "detail_level": "high",
      "include_examples": true
    }
  }
}
```

## Advanced Personality Features

### Emotional Intelligence

```json
{
  "emotionalIntelligence": {
    "enabled": true,
    "empathy_level": "high",
    "emotion_detection": true,
    "adaptive_tone": true
  }
}
```

### Learning and Adaptation

```json
{
  "adaptation": {
    "learn_from_feedback": true,
    "adapt_to_user_style": true,
    "remember_preferences": true
  }
}
```

### Personality Evolution

```json
{
  "evolution": {
    "enabled": false,
    "learning_rate": 0.1,
    "stability": 0.9
  }
}
```

## Example Personalities

### The Helper

```json
{
  "name": "Helper Bot",
  "personality": {
    "traits": ["helpful", "patient", "friendly", "reliable"],
    "style": "warm and approachable",
    "tone": "supportive and encouraging",
    "adjectives": ["dependable", "caring", "knowledgeable"]
  },
  "messageTemplates": {
    "greeting": ["Hi! I'm here to help. What do you need?"],
    "uncertainty": ["Let me look into that for you."]
  }
}
```

### The Expert

```json
{
  "name": "Expert Advisor",
  "personality": {
    "traits": ["analytical", "professional", "direct", "knowledgeable"],
    "style": "professional and precise",
    "tone": "confident and authoritative",
    "adjectives": ["experienced", "thorough", "reliable"]
  },
  "responseGuidelines": {
    "includeLinks": true,
    "includeSources": true,
    "detailLevel": "high"
  }
}
```

### The Entertainer

```json
{
  "name": "Fun Bot",
  "personality": {
    "traits": ["humorous", "creative", "enthusiastic", "playful"],
    "style": "casual and entertaining",
    "tone": "upbeat and fun",
    "adjectives": ["witty", "energetic", "engaging"]
  },
  "responseGuidelines": {
    "useEmojis": true,
    "humor_level": "moderate"
  }
}
```

## Testing Personality

### Consistency Testing

```javascript
const testPersonalityConsistency = async (agentId) => {
  const tests = [
    { input: 'Hello', expectTrait: 'friendly' },
    { input: 'Explain quantum physics', expectTrait: 'knowledgeable' },
    { input: 'I\'m frustrated', expectTrait: 'empathetic' }
  ];

  for (const test of tests) {
    const response = await sendMessage(agentId, test.input);
    console.log(`Input: ${test.input}`);
    console.log(`Response: ${response}`);
    console.log(`Expected trait: ${test.expectTrait}\n`);
  }
};
```

## Best Practices

1. **Be Specific**: Define clear, distinct personality traits
2. **Stay Consistent**: Personality should be stable across interactions
3. **Match Context**: Align personality with agent's purpose
4. **Test Thoroughly**: Verify personality manifests in responses
5. **Balance Traits**: Avoid conflicting personality characteristics
6. **User-Centric**: Design personality for your target audience
7. **Evolve Gradually**: Make personality changes incrementally
8. **Document Changes**: Track personality configurations

## Common Pitfalls

❌ **Too Many Traits**: Don't define 10+ traits
✅ **Focused**: 3-5 core traits

❌ **Conflicting Traits**: "professional" + "very casual"
✅ **Aligned**: "professional" + "approachable"

❌ **Vague Descriptions**: "nice personality"
✅ **Specific**: "patient, empathetic, detail-oriented"

## Next Steps

- [Character Interface](character-interface.md) - Complete character configuration reference
- [Memory and State](memory-state.md) - How agents remember and learn
- [Customize an Agent](../guides/customize-agent.md) - Practical customization guide

## Need Help?

- [Discord Community](https://discord.gg/clawinfra)
- [GitHub Discussions](https://github.com/gwentanky/clawinfra/discussions)
