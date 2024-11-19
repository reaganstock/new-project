export type NodeType = 
  | 'send-dm'
  | 'wait-time'
  | 'if-then'
  | 'end-campaign';

export type PlatformType = 
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'twitter'
  | 'whatsapp'
  | 'telegram'
  | 'discord'
  | 'reddit'
  | 'pinterest'
  | 'nextdoor'
  | 'skool'
  | 'slack'
  | 'tiktok';

export interface NodeData {
  type: NodeType;
  label: string;
  platform?: PlatformType;
  content?: string;
  delay?: number;
  variants?: Array<{
    id: string;
    content: string;
    weight: number;
  }>;
  condition?: {
    type: 'message_sent' | 'message_read' | 'message_replied';
    value: boolean;
  };
}