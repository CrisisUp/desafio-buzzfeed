export interface Option { id: number; name: string; alias: string; }
export interface Question { id: number; question: string; options: Option[]; }
