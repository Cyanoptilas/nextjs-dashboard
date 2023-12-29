import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
});

// Lusitana
//  options: {
//     weight: "400" | "700" | ("400" | "700")[];
//     style?: "normal" | "normal"[] | undefined;
//     display?: Display | undefined;
//     variable?: undefined;
//     preload?: boolean | undefined;
//     fallback?: string[] | undefined;
//     adjustFontFallback?: boolean | undefined;
//     subsets?: "latin"[] | undefined;
// }
