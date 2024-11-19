export type PlatformType = 
  | 'Instagram'
  | 'Facebook'
  | 'LinkedIn'
  | 'Twitter'
  | 'WhatsApp'
  | 'Telegram'
  | 'Discord'
  | 'Reddit'
  | 'Pinterest'
  | 'Nextdoor'
  | 'Skool'
  | 'Slack'
  | 'TikTok';

export type ActionType = 
  | 'message'
  | 'wait';

export interface Message {
  id: string;
  type: ActionType;
  content: string;
  delay: number;
  platform?: PlatformType;
  variants?: Array<{
    id: string;
    content: string;
    weight: number;
  }>;
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  platform: PlatformType;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}