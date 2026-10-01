// Scheme data types
export interface SchemeEligibilityCriteria {
  id: string;
  question_hi: string;
  question_simple_hi: string;
  type: 'yes_no' | 'choice';
  required_answer?: string;
  choices_hi?: string[];
  eligible_answers?: string[];
  explanation_hi: string;
  fallback_hi?: string;
  note_second_child_hi?: string;
}

export interface SchemeDocument {
  id: string;
  name_hi: string;
  description_hi: string;
  icon: string;
  priority: number;
}

export interface SchemeWhereToApply {
  primary: {
    name_hi: string;
    description_hi: string;
    icon: string;
  };
  alternative: {
    name_hi: string;
    description_hi: string;
    icon: string;
  };
  online: {
    name_hi: string;
    url: string;
    description_hi: string;
    icon: string;
  };
}

export interface SchemeSource {
  claim: string;
  url: string;
  source_name: string;
  last_verified: string;
}

export interface SchemeData {
  scheme_id: string;
  scheme_name: string;
  scheme_name_en: string;
  language: string;
  description: string;
  eligibility: {
    summary: string;
    criteria: SchemeEligibilityCriteria[];
    exclusions_hi: string[];
  };
  benefits: {
    first_child: {
      amount: string;
      installments: string;
      details_hi: string;
    };
    second_child_girl: {
      amount: string;
      installments: string;
      condition_hi: string;
      details_hi: string;
    };
  };
  documents: SchemeDocument[];
  where_to_apply: SchemeWhereToApply;
  helpline: {
    number: string;
    hours_hi: string;
    description_hi: string;
  };
  sources: SchemeSource[];
  conversation_flow: {
    greeting_hi: string;
    purpose_hi: string;
    eligible_response_hi: string;
    not_eligible_response_hi: string;
    documents_intro_hi: string;
    where_to_go_hi: string;
    closing_hi: string;
    uncertainty_hi: string;
    privacy_hi: string;
  };
}

// Conversation state types
export type ConversationPhase = 
  | 'greeting'
  | 'purpose'
  | 'question'
  | 'eligibility_result'
  | 'documents'
  | 'where_to_go'
  | 'closing'
  | 'error';

export type AudioState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

export interface ConversationState {
  phase: ConversationPhase;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  isLikelyEligible: boolean | null;
  lastResponse: string;
  lastAudioUrl: string | null;
  retryCount: number;
  messageHistory: ChatMessage[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AppConfig {
  language: string;
  scheme: string;
  app_name: string;
  app_tagline: string;
  supported_languages: string[];
  supported_schemes: string[];
}
