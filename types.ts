export interface User {
  id: string;
  username: string;
  email: string;
  joinedDate: string;
}

export interface ArtPiece {
  id: string;
  imageUrl: string; // Base64 or URL
  prompt: string;
  style: string;
  aspectRatio: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  likes: number;
}

export enum ArtStyle {
  REALISTIC = 'Realistic',
  ANIME = 'Anime',
  OIL_PAINTING = 'Oil Painting',
  CYBERPUNK = 'Cyberpunk',
  WATERCOLOR = 'Watercolor',
  PIXEL_ART = 'Pixel Art',
  FANTASY = 'Fantasy',
  ABSTRACT = 'Abstract',
  PHOTOGRAPHY = 'Photography'
}

export enum AspectRatio {
  SQUARE = '1:1',
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
  CLASSIC_LANDSCAPE = '4:3',
  CLASSIC_PORTRAIT = '3:4'
}

export interface GenerationConfig {
  prompt: string;
  style: ArtStyle;
  aspectRatio: AspectRatio;
}
