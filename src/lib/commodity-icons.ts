import {
  Cherry,
  Carrot,
  Wheat,
  Cookie,
  Leaf,
  Droplet,
  Apple,
  Croissant,
  Sprout,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps each commodity slug to a simple Lucide line icon. We avoid emoji and
 * illustration; the icon is a quiet visual anchor, not a decoration.
 */
export const COMMODITY_ICONS: Record<string, LucideIcon> = {
  tomato: Cherry,
  yam: Carrot,
  'ofada-rice': Wheat,
  'white-garri': Cookie,
  beans: Leaf,
  'palm-oil': Droplet,
  'sweet-potato': Apple,
  'wheat-flour': Croissant,
};

export function getCommodityIcon(id: string): LucideIcon {
  return COMMODITY_ICONS[id] ?? Sprout;
}
