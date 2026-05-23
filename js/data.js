'use strict';

/* ============================================================
   SVG ILLUSTRATIONS
   Stroke: #5a3a1a (ink) · #c8922a (gold)
   ============================================================ */

const SVG_EYE = `<svg viewBox="0 0 200 230" width="172" height="198" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 8 C8 20 16 28 26 24 C36 20 38 10 32 6 C26 2 18 6 16 14 C14 22 20 28 26 24" fill="none" stroke="#c8922a" stroke-width="1.1" opacity="0.75" stroke-linecap="round"/>
  <ellipse cx="14" cy="13" rx="4.5" ry="2" fill="rgba(200,146,42,0.22)" stroke="#c8922a" stroke-width="0.7" transform="rotate(-45 14 13)"/>
  <path d="M192 8 C192 20 184 28 174 24 C164 20 162 10 168 6 C174 2 182 6 184 14 C186 22 180 28 174 24" fill="none" stroke="#c8922a" stroke-width="1.1" opacity="0.75" stroke-linecap="round"/>
  <ellipse cx="186" cy="13" rx="4.5" ry="2" fill="rgba(200,146,42,0.22)" stroke="#c8922a" stroke-width="0.7" transform="rotate(45 186 13)"/>
  <path d="M8 222 C8 210 16 202 26 206 C36 210 38 220 32 224 C26 228 18 224 16 216 C14 208 20 202 26 206" fill="none" stroke="#c8922a" stroke-width="1.1" opacity="0.75" stroke-linecap="round"/>
  <ellipse cx="14" cy="217" rx="4.5" ry="2" fill="rgba(200,146,42,0.22)" stroke="#c8922a" stroke-width="0.7" transform="rotate(45 14 217)"/>
  <path d="M192 222 C192 210 184 202 174 206 C164 210 162 220 168 224 C174 228 182 224 184 216 C186 208 180 202 174 206" fill="none" stroke="#c8922a" stroke-width="1.1" opacity="0.75" stroke-linecap="round"/>
  <ellipse cx="186" cy="217" rx="4.5" ry="2" fill="rgba(200,146,42,0.22)" stroke="#c8922a" stroke-width="0.7" transform="rotate(-45 186 217)"/>
  <path d="M34 8 C100 2 160 2 166 8" fill="none" stroke="#c8922a" stroke-width="0.5" opacity="0.35" stroke-dasharray="3,5"/>
  <path d="M34 222 C100 228 160 228 166 222" fill="none" stroke="#c8922a" stroke-width="0.5" opacity="0.35" stroke-dasharray="3,5"/>
  <path d="M44 115 Q100 70 156 115 Q100 160 44 115 Z" fill="rgba(90,58,26,0.04)" stroke="#5a3a1a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M58 107 Q100 82 142 107" fill="none" stroke="#5a3a1a" stroke-width="0.7" opacity="0.35"/>
  <circle cx="100" cy="115" r="27" fill="rgba(200,146,42,0.06)" stroke="#5a3a1a" stroke-width="1.8"/>
  <path d="M100 88 C106 100 106 112 100 115 C94 112 94 100 100 88" fill="rgba(90,58,26,0.07)" stroke="#5a3a1a" stroke-width="0.9"/>
  <path d="M127 115 C115 109 103 109 100 115 C103 121 115 121 127 115" fill="rgba(90,58,26,0.07)" stroke="#5a3a1a" stroke-width="0.9"/>
  <path d="M73 115 C85 109 97 109 100 115 C97 121 85 121 73 115" fill="rgba(90,58,26,0.07)" stroke="#5a3a1a" stroke-width="0.9"/>
  <path d="M100 142 C106 130 106 118 100 115 C94 118 94 130 100 142" fill="rgba(90,58,26,0.07)" stroke="#5a3a1a" stroke-width="0.9"/>
  <circle cx="100" cy="115" r="10" fill="rgba(90,58,26,0.22)" stroke="#5a3a1a" stroke-width="1.6"/>
  <circle cx="107" cy="109" r="4" fill="rgba(200,146,42,0.78)"/>
  <circle cx="106" cy="108" r="1.5" fill="rgba(255,240,180,0.9)"/>
  <path d="M74 97 C70 83 73 70 78 64" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
  <ellipse cx="75" cy="80" rx="5" ry="2" fill="rgba(90,58,26,0.11)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-22 75 80)"/>
  <path d="M90 88 C88 74 90 61 94 55" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
  <ellipse cx="91" cy="71" rx="5" ry="2" fill="rgba(90,58,26,0.11)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-8 91 71)"/>
  <path d="M110 88 C110 74 112 61 116 55" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
  <ellipse cx="113" cy="71" rx="5" ry="2" fill="rgba(90,58,26,0.11)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(8 113 71)"/>
  <path d="M124 96 C128 82 129 68 126 62" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
  <ellipse cx="127" cy="79" rx="5" ry="2" fill="rgba(90,58,26,0.11)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(22 127 79)"/>
  <path d="M44 115 C26 112 14 102 10 86 C6 70 12 56 22 52" fill="none" stroke="#5a3a1a" stroke-width="1.3" stroke-linecap="round"/>
  <ellipse cx="16" cy="96" rx="7" ry="2.8" fill="rgba(90,58,26,0.09)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-42 16 96)"/>
  <ellipse cx="20" cy="62" rx="6" ry="2.5" fill="rgba(90,58,26,0.09)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-52 20 62)"/>
  <circle cx="22" cy="52" r="3.5" fill="rgba(200,146,42,0.3)" stroke="#c8922a" stroke-width="0.8"/>
  <path d="M156 115 C174 112 186 102 190 86 C194 70 188 56 178 52" fill="none" stroke="#5a3a1a" stroke-width="1.3" stroke-linecap="round"/>
  <ellipse cx="184" cy="96" rx="7" ry="2.8" fill="rgba(90,58,26,0.09)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(42 184 96)"/>
  <ellipse cx="180" cy="62" rx="6" ry="2.5" fill="rgba(90,58,26,0.09)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(52 180 62)"/>
  <circle cx="178" cy="52" r="3.5" fill="rgba(200,146,42,0.3)" stroke="#c8922a" stroke-width="0.8"/>
  <path d="M100 162 C88 170 78 182 72 196" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M100 162 C112 170 122 182 128 196" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
  <ellipse cx="79" cy="180" rx="8" ry="3" fill="rgba(90,58,26,0.09)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-28 79 180)"/>
  <ellipse cx="121" cy="180" rx="8" ry="3" fill="rgba(90,58,26,0.09)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(28 121 180)"/>
  <circle cx="72" cy="196" r="4.5" fill="rgba(200,146,42,0.28)" stroke="#c8922a" stroke-width="0.9"/>
  <circle cx="128" cy="196" r="4.5" fill="rgba(200,146,42,0.28)" stroke="#c8922a" stroke-width="0.9"/>
  <circle cx="100" cy="164" r="3" fill="rgba(200,146,42,0.5)"/>
</svg>`;

const SVG_CURIE = `<svg viewBox="0 0 200 200" width="172" height="172" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="100" rx="75" ry="28" fill="none" stroke="#5a3a1a" stroke-width="1.4" opacity="0.7" stroke-dasharray="4,2"/>
  <ellipse cx="100" cy="100" rx="75" ry="28" fill="none" stroke="#5a3a1a" stroke-width="1.4" opacity="0.7" stroke-dasharray="4,2" transform="rotate(60 100 100)"/>
  <ellipse cx="100" cy="100" rx="75" ry="28" fill="none" stroke="#5a3a1a" stroke-width="1.4" opacity="0.7" stroke-dasharray="4,2" transform="rotate(120 100 100)"/>
  <ellipse cx="175" cy="100" rx="8" ry="3.5" fill="rgba(90,58,26,0.12)" stroke="#5a3a1a" stroke-width="0.9"/>
  <ellipse cx="25" cy="100" rx="8" ry="3.5" fill="rgba(90,58,26,0.12)" stroke="#5a3a1a" stroke-width="0.9"/>
  <ellipse cx="137" cy="165" rx="8" ry="3.5" fill="rgba(90,58,26,0.12)" stroke="#5a3a1a" stroke-width="0.9" transform="rotate(60 137 165)"/>
  <ellipse cx="63" cy="35" rx="8" ry="3.5" fill="rgba(90,58,26,0.12)" stroke="#5a3a1a" stroke-width="0.9" transform="rotate(60 63 35)"/>
  <ellipse cx="137" cy="35" rx="8" ry="3.5" fill="rgba(90,58,26,0.12)" stroke="#5a3a1a" stroke-width="0.9" transform="rotate(120 137 35)"/>
  <ellipse cx="63" cy="165" rx="8" ry="3.5" fill="rgba(90,58,26,0.12)" stroke="#5a3a1a" stroke-width="0.9" transform="rotate(120 63 165)"/>
  <circle cx="100" cy="100" r="18" fill="rgba(200,146,42,0.1)" stroke="#5a3a1a" stroke-width="1.6"/>
  <path d="M100 82 C104 90 104 98 100 100 C96 98 96 90 100 82" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.9"/>
  <path d="M118 100 C110 96 102 96 100 100 C102 104 110 104 118 100" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.9"/>
  <path d="M82 100 C90 96 98 96 100 100 C98 104 90 104 82 100" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.9"/>
  <path d="M100 118 C104 110 104 102 100 100 C96 102 96 110 100 118" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.9"/>
  <circle cx="100" cy="100" r="6" fill="rgba(200,146,42,0.45)" stroke="#c8922a" stroke-width="1"/>
  <circle cx="103" cy="97" r="2" fill="rgba(255,240,180,0.8)"/>
  <circle cx="175" cy="100" r="3.5" fill="#c8922a" opacity="0.7"/>
  <circle cx="25" cy="100" r="3.5" fill="#c8922a" opacity="0.7"/>
  <circle cx="137" cy="35" r="3.5" fill="#c8922a" opacity="0.7"/>
  <circle cx="63" cy="165" r="3.5" fill="#c8922a" opacity="0.7"/>
  <circle cx="63" cy="35" r="3.5" fill="#c8922a" opacity="0.7"/>
  <circle cx="137" cy="165" r="3.5" fill="#c8922a" opacity="0.7"/>
  <path d="M28 22 L30 16 L32 22 L38 22 L33 26 L35 32 L30 28 L25 32 L27 26 L22 22 Z" fill="rgba(200,146,42,0.35)" stroke="#c8922a" stroke-width="0.8"/>
  <path d="M168 22 L170 16 L172 22 L178 22 L173 26 L175 32 L170 28 L165 32 L167 26 L162 22 Z" fill="rgba(200,146,42,0.35)" stroke="#c8922a" stroke-width="0.8"/>
  <text x="30" y="40" font-family="'IM Fell English',serif" font-size="7" fill="#c8922a" text-anchor="middle" opacity="0.8">Nobel</text>
  <text x="170" y="40" font-family="'IM Fell English',serif" font-size="7" fill="#c8922a" text-anchor="middle" opacity="0.8">Nobel</text>
  <path d="M20 22 C16 18 14 12 18 8" fill="none" stroke="#5a3a1a" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M180 22 C184 18 186 12 182 8" fill="none" stroke="#5a3a1a" stroke-width="0.8" stroke-linecap="round"/>
</svg>`;

const SVG_CHAUVIN = `<svg viewBox="0 0 200 210" width="172" height="180" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 195 C80 190 60 185 40 192" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M100 195 C120 190 140 185 160 192" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
  <ellipse cx="55" cy="188" rx="9" ry="3.5" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.8" transform="rotate(-20 55 188)"/>
  <ellipse cx="145" cy="188" rx="9" ry="3.5" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.8" transform="rotate(20 145 188)"/>
  <rect x="96" y="75" width="8" height="120" rx="2" fill="rgba(90,58,26,0.08)" stroke="#5a3a1a" stroke-width="1.3"/>
  <path d="M98 80 C104 90 96 100 104 110 C96 120 104 130 96 140 C104 150 96 160 104 170 C96 180 104 188 100 195" fill="none" stroke="#5a3a1a" stroke-width="0.9" stroke-linecap="round"/>
  <ellipse cx="94" cy="95" rx="5" ry="2" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-30 94 95)"/>
  <ellipse cx="106" cy="120" rx="5" ry="2" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(30 106 120)"/>
  <ellipse cx="94" cy="148" rx="5" ry="2" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-30 94 148)"/>
  <ellipse cx="106" cy="174" rx="5" ry="2" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(30 106 174)"/>
  <rect x="30" y="72" width="140" height="6" rx="3" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="1.4"/>
  <path d="M90 72 L100 60 L110 72" fill="rgba(90,58,26,0.12)" stroke="#5a3a1a" stroke-width="1.3"/>
  <circle cx="100" cy="58" r="6" fill="rgba(200,146,42,0.25)" stroke="#c8922a" stroke-width="1.1"/>
  <line x1="36" y1="75" x2="36" y2="118" stroke="#5a3a1a" stroke-width="1" stroke-dasharray="2,2"/>
  <path d="M20 118 Q36 122 52 118" fill="rgba(90,58,26,0.06)" stroke="#5a3a1a" stroke-width="1.3"/>
  <path d="M24 114 C26 108 30 106 34 108 C38 106 42 108 44 114" fill="none" stroke="#5a3a1a" stroke-width="0.9"/>
  <ellipse cx="28" cy="110" rx="4" ry="2" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-20 28 110)"/>
  <ellipse cx="44" cy="110" rx="4" ry="2" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(20 44 110)"/>
  <path d="M33 114 C34 106 36 100 38 96 C40 92 42 90 44 88" fill="none" stroke="#5a3a1a" stroke-width="1" stroke-linecap="round"/>
  <path d="M38 96 C36 98 34 100 33 104" fill="rgba(90,58,26,0.06)" stroke="#5a3a1a" stroke-width="0.7"/>
  <path d="M44 88 C42 88 40 89 38 91" fill="rgba(90,58,26,0.08)" stroke="#5a3a1a" stroke-width="0.7"/>
  <line x1="164" y1="75" x2="164" y2="128" stroke="#5a3a1a" stroke-width="1" stroke-dasharray="2,2"/>
  <path d="M148 128 Q164 132 180 128" fill="rgba(90,58,26,0.06)" stroke="#5a3a1a" stroke-width="1.3"/>
  <circle cx="158" cy="124" r="5" fill="rgba(200,146,42,0.2)" stroke="#c8922a" stroke-width="0.8"/>
  <circle cx="170" cy="124" r="5" fill="rgba(200,146,42,0.2)" stroke="#c8922a" stroke-width="0.8"/>
  <circle cx="164" cy="120" r="4" fill="rgba(200,146,42,0.25)" stroke="#c8922a" stroke-width="0.8"/>
  <path d="M164 115 L164 120" stroke="#5a3a1a" stroke-width="0.8"/>
  <path d="M82 60 C82 48 86 42 94 40 C100 38 100 38 106 40 C114 42 118 48 118 60" fill="none" stroke="#5a3a1a" stroke-width="1"/>
  <ellipse cx="84" cy="50" rx="5" ry="2.5" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-35 84 50)"/>
  <ellipse cx="116" cy="50" rx="5" ry="2.5" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(35 116 50)"/>
  <ellipse cx="94" cy="40" rx="5" ry="2.5" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-10 94 40)"/>
  <ellipse cx="106" cy="40" rx="5" ry="2.5" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(10 106 40)"/>
  <circle cx="100" cy="38" r="3.5" fill="rgba(200,146,42,0.4)" stroke="#c8922a" stroke-width="0.8"/>
</svg>`;

const SVG_SWITZER = `<svg viewBox="0 0 220 200" width="190" height="172" xmlns="http://www.w3.org/2000/svg">
  <line x1="10" y1="162" x2="210" y2="162" stroke="#5a3a1a" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="10" y1="168" x2="210" y2="168" stroke="#5a3a1a" stroke-width="1.8" stroke-linecap="round" opacity="0.4"/>
  <ellipse cx="28" cy="148" rx="10" ry="4" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.9" transform="rotate(-15 28 148)"/>
  <ellipse cx="50" cy="138" rx="8" ry="3.5" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.9" transform="rotate(-30 50 138)"/>
  <ellipse cx="42" cy="155" rx="7" ry="3" fill="rgba(90,58,26,0.08)" stroke="#5a3a1a" stroke-width="0.8" transform="rotate(10 42 155)"/>
  <ellipse cx="65" cy="144" rx="9" ry="3.5" fill="rgba(90,58,26,0.09)" stroke="#5a3a1a" stroke-width="0.8" transform="rotate(-20 65 144)"/>
  <ellipse cx="72" cy="155" rx="6" ry="2.5" fill="rgba(90,58,26,0.08)" stroke="#5a3a1a" stroke-width="0.8" transform="rotate(15 72 155)"/>
  <path d="M22 152 C36 148 52 142 68 148 C76 151 82 154 88 155" fill="none" stroke="#5a3a1a" stroke-width="0.9" stroke-linecap="round"/>
  <circle cx="30" cy="140" r="3" fill="rgba(200,146,42,0.3)" stroke="#c8922a" stroke-width="0.7"/>
  <circle cx="58" cy="132" r="2.5" fill="rgba(200,146,42,0.3)" stroke="#c8922a" stroke-width="0.7"/>
  <path d="M18 148 C14 144 12 140 16 136 C20 132 24 136 20 140" fill="none" stroke="#c8922a" stroke-width="0.8" opacity="0.5"/>
  <circle cx="130" cy="70" r="14" fill="rgba(90,58,26,0.06)" stroke="#5a3a1a" stroke-width="1.6"/>
  <path d="M130 56 C140 50 152 52 158 60 C162 66 158 72 148 72" fill="rgba(90,58,26,0.08)" stroke="#5a3a1a" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M130 84 C126 100 122 116 124 130" stroke="#5a3a1a" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <path d="M130 95 C118 88 108 86 102 90" stroke="#5a3a1a" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <path d="M130 90 C140 82 150 80 158 86" stroke="#5a3a1a" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <path d="M124 130 C118 144 110 156 106 162" stroke="#5a3a1a" stroke-width="1.6" stroke-linecap="round" fill="none"/>
  <path d="M124 130 C132 144 136 154 140 162" stroke="#5a3a1a" stroke-width="1.6" stroke-linecap="round" fill="none"/>
  <path d="M140 162 C144 154 150 150 154 152" stroke="#5a3a1a" stroke-width="1.4" stroke-linecap="round" fill="none"/>
  <rect x="118" y="92" width="22" height="16" rx="1.5" fill="rgba(200,146,42,0.15)" stroke="#c8922a" stroke-width="1"/>
  <text x="129" y="103" font-family="'IM Fell English',serif" font-size="9" fill="#5a3a1a" text-anchor="middle" font-weight="bold">261</text>
  <line x1="196" y1="100" x2="196" y2="162" stroke="#c8922a" stroke-width="2" opacity="0.7"/>
  <path d="M188 104 C192 106 196 104 200 106" fill="none" stroke="#c8922a" stroke-width="1.4"/>
  <path d="M188 110 C192 112 196 110 200 112" fill="none" stroke="#c8922a" stroke-width="1.4"/>
  <ellipse cx="196" cy="96" rx="6" ry="3" fill="rgba(200,146,42,0.25)" stroke="#c8922a" stroke-width="0.8"/>
  <path d="M190 96 C186 90 184 84 188 80" fill="none" stroke="#5a3a1a" stroke-width="0.9" stroke-linecap="round"/>
  <ellipse cx="187" cy="87" rx="4.5" ry="2" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-30 187 87)"/>
</svg>`;

const SVG_MIROIR = `<svg viewBox="0 0 200 200" width="172" height="172" xmlns="http://www.w3.org/2000/svg">
  <line x1="100" y1="15" x2="100" y2="185" stroke="#5a3a1a" stroke-width="0.8" stroke-dasharray="4,4" opacity="0.4"/>
  <path d="M90 40 C80 44 74 54 74 66 C74 78 80 86 88 90 C92 92 94 96 92 100 C90 104 86 106 84 110 C80 118 82 128 88 132" fill="rgba(90,58,26,0.05)" stroke="#5a3a1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M78 60 Q84 56 88 60 Q84 64 78 60 Z" fill="rgba(90,58,26,0.15)" stroke="#5a3a1a" stroke-width="0.9"/>
  <path d="M74 70 C68 68 64 72 66 78 C68 84 74 84 76 80" fill="none" stroke="#5a3a1a" stroke-width="1" stroke-linecap="round"/>
  <ellipse cx="65" cy="74" rx="5" ry="2.5" fill="rgba(90,58,26,0.09)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-20 65 74)"/>
  <path d="M110 40 C120 44 126 54 126 66 C126 78 120 86 112 90 C108 92 106 96 108 100 C110 104 114 106 116 110 C120 118 118 128 112 132" fill="rgba(90,58,26,0.05)" stroke="#5a3a1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M122 60 Q116 56 112 60 Q116 64 122 60 Z" fill="rgba(90,58,26,0.15)" stroke="#5a3a1a" stroke-width="0.9"/>
  <path d="M126 70 C132 68 136 72 134 78 C132 84 126 84 124 80" fill="none" stroke="#5a3a1a" stroke-width="1" stroke-linecap="round"/>
  <ellipse cx="135" cy="74" rx="5" ry="2.5" fill="rgba(90,58,26,0.09)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(20 135 74)"/>
  <path d="M100 175 C96 160 92 148 96 138 C100 128 104 128 100 118 C96 110 92 106 92 100" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M100 175 C104 160 108 148 104 138 C100 128 96 128 100 118 C104 110 108 106 108 100" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
  <ellipse cx="93" cy="150" rx="7" ry="2.8" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.8" transform="rotate(-30 93 150)"/>
  <ellipse cx="96" cy="130" rx="6" ry="2.5" fill="rgba(90,58,26,0.09)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-20 96 130)"/>
  <ellipse cx="107" cy="150" rx="7" ry="2.8" fill="rgba(90,58,26,0.1)" stroke="#5a3a1a" stroke-width="0.8" transform="rotate(30 107 150)"/>
  <ellipse cx="104" cy="130" rx="6" ry="2.5" fill="rgba(90,58,26,0.09)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(20 104 130)"/>
  <circle cx="100" cy="118" r="5" fill="rgba(200,146,42,0.25)" stroke="#c8922a" stroke-width="0.9"/>
  <circle cx="100" cy="140" r="4" fill="rgba(200,146,42,0.2)" stroke="#c8922a" stroke-width="0.8"/>
  <circle cx="100" cy="175" r="5" fill="rgba(200,146,42,0.28)" stroke="#c8922a" stroke-width="0.9"/>
  <path d="M52 32 Q52 22 62 22 L90 22 Q98 22 98 30 L98 38 Q98 44 92 46 L80 46 L76 52 L74 46 L62 46 Q52 46 52 40 Z" fill="rgba(90,58,26,0.04)" stroke="#5a3a1a" stroke-width="1" stroke-linejoin="round"/>
  <text x="75" y="37" font-family="serif" font-size="12" fill="#5a3a1a" text-anchor="middle" opacity="0.5">…</text>
  <ellipse cx="50" cy="30" rx="5" ry="2.5" fill="rgba(90,58,26,0.08)" stroke="#5a3a1a" stroke-width="0.7" transform="rotate(-40 50 30)"/>
  <rect x="97" y="12" width="6" height="6" fill="rgba(200,146,42,0.4)" stroke="#c8922a" stroke-width="0.8" transform="rotate(45 100 15)"/>
</svg>`;

/* ============================================================
   PAGES — 10 spreads:
   0  Cover
   1  Bio Marie Curie       (left: photo / right: quote)
   2  Transition Curie→Chauvin  (both: popup SVGs)
   3  Bio Jeanne Chauvin
   4  Transition Chauvin→Switzer
   5  Bio Kathrine Switzer
   6  Transition Anne Hathaway
   7  Bio Anne Hathaway
   8  Transition Anne Hathaway→Finale
   9  Finale
   ============================================================ */

const pages = [

  /* 0 — COVER */
  {
    id: 0, type: 'cover', era: 'ancient',
    svgPopup: SVG_EYE
  },

  /* 1 — BIO Jeanne Chauvin */
  {
    id: 1, type: 'bio', era: 'transition',
    year: '1897', domain: 'Droit', location: 'France', name: 'Jeanne Chauvin',
    description: 'Elle a étudié le droit. Elle a voulu le plaider. On lui a dit non.<br>Elle a plaidé quand même.',
    biasQuote: 'la profession d’avocat étant depuis toujours un office viril',
    biasQuoteAttrib: '— Cour d’appel de Paris, 30 novembre 1897',
    decode: '<b>Ce n’est pas un titre. C’est une porte.</b><br>En entrant dans ce prétoire, Chauvin ne demandait pas la permission d\'exister dans le droit — elle le faisait, là où aucune n\'avait osé avant. Et ce faisant, elle ne prouvait pas que c\'était possible : elle rendait absurde que ça ne l\'ait pas été.',
    photoImg: 'assets/images/Jeanne_Chauvin.jpg',
    photoCaption: 'Jeanne Chauvin, première avocate plaidante'
  },

  /* 2 — TRANSITION Chauvin → Curie*/
  {
    id: 2, type: 'transition', era: 'ancient',
    svgLeft: SVG_CHAUVIN,
    svgRight: SVG_CURIE
  },

  /* 3 — BIO Marie Curie*/
  {
    id: 3, type: 'bio', era: 'ancient',
    year: '1911', domain: 'Sciences', location: 'Pologne', name: 'Marie Curie',
    description: 'Elle ne cherchait pas à prouver qu’elle pouvait. Elle cherchait à comprendre le monde. Deux Nobel plus tard, la question ne se posait plus.',
    biasQuote: 'there was, in its opinion, an immutable tradition against the election of women, which it seemed eminently wise to respect.',
    biasQuoteAttrib: '— Institut de France, débat rapporté par Nature, 1911',
    decode: '<b>L’Académie a voté. La tradition a prévalu. Curie a persévéré.</b><br>Il n’y a pas de réponse plus simple à donner à ceux qui ferment les portes : persévérer, jusqu’à ce que la preuve soit plus grande que le préjugé.',
    photoImg: 'assets/images/marie-curie.jpg',
    photoCaption: 'Maria Skłodowska, vers 1900'
  },

  /* 4 — TRANSITION Chauvin → Switzer */
  {
    id: 4, type: 'transition', era: 'transition',
    svgLeft: SVG_CHAUVIN,
    svgRight: SVG_SWITZER
  },

  /* 5 — BIO Kathrine Switzer */
  {
    id: 5, type: 'bio', era: 'modern',
    year: '1967', domain: 'Sport', location: 'États-Unis', name: 'Kathrine Switzer',
    description: 'Dossard 261. Le directeur de course tente de l’arracher. Elle court. Cette image n’a pas vieilli.',
    biasQuote: 'Get the hell out of my race and give me those numbers!',
    biasQuoteAttrib: '— Jock Semple, Boston Athletic Association, Marathon de Boston, 19 avril 1967',
    decode: '<b>Une seule course. Une seule photo.</b><br>Et cette image a couru plus loin qu’elle — autour du monde, et dans le temps. Switzer a continué de se battre jusqu’en 1972, année où le marathon de Boston ouvre officiellement ses portes aux femmes. L’action vient toujours avant le droit.',
    photoImg: 'assets/images/kathrine-switzer1.jpg',
    photoCaption: 'Kathrine Switzer, dossard 261, Boston 1967'
  },

  /* 6 — TRANSITION Switzer → Anne Hathaway */
  {
    id: 6, type: 'transition', era: 'modern',
    svgLeft: SVG_SWITZER,
    svgRight: SVG_MIROIR
  },

  /* 7 — BIO Anne Hathaway */
  {
    id: 7, type: 'bio', era: 'contemporary',
    year: '2026', domain: 'Internet', location: '', name: 'Anne Hathaway',
    description: 'La résistance a changé de forme. Ce qu’on essaie d’éteindre aujourd’hui, c’est une voix. <br>«they chose action in a world that expects silence.»',
    biasQuote: 'our choosing to celebrate today does not signal that we are here to accommodate injustice. No, our celebration today affirms our determination to outlast it.',
    biasQuoteAttrib: '— ONU – Journée internationale des droits des femmes,2026',
    decode: '<b>L’espace public n’est plus seulement une salle d’audience ou un starting-block.</b><br> Il est partout — et partout, il se rejoue la même question : est-ce que cette présence est légitime ? Est-ce que cette voix a le droit d’être là ? La réponse se forge encore. Grâce à elles. Grâce à nous.',
    photoImg: 'assets/images/anne_hathaway.jpg',
    photoCaption: 'Journée internationale des droits des femmes, 2026'
  },

  /* 8 — TRANSITION Anne Hathaway → Finale */
  {
    id: 8, type: 'transition', era: 'contemporary',
    svgLeft: SVG_MIROIR,
    svgRight: SVG_EYE
  },

  /* 9 — FINALE */
  { id: 9, type: 'finale', era: 'finale' }

];
