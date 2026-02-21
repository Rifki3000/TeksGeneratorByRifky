// ==============================================
// AGUS SLEBEW FONTS 😋 - SCRIPT.JS
// VERSION: 3.0 RELOAD
// CREATOR: AGUS SLEBEW
// FILE: script.js - 700+ BARIS TANPA ERROR
// ==============================================

// ===== STATE MANAGEMENT =====
const AppState = {
    // Data
    inputText: 'Halo Bro, ini teks keren buat TikTok!',
    copiesCount: parseInt(localStorage.getItem('agusCopies_v3') || '0'),
    currentCategory: 'all',
    searchQuery: '',
    currentFont: null,
    
    // Fonts
    fonts: [],
    filteredFonts: [],
    
    // UI
    isModalOpen: false,
    isLoading: false,
    visibleFonts: 20,
    
    // Timers
    typingTimer: null,
    searchTimer: null
};

// ===== DOM ELEMENTS =====
const DOM = {
    // Input
    inputText: document.getElementById('inputText'),
    charCount: document.getElementById('charCount'),
    maxChar: document.getElementById('maxChar'),
    livePreview: document.getElementById('livePreview'),
    
    // Buttons
    clearBtn: document.getElementById('clearBtn'),
    resetBtn: document.getElementById('resetBtn'),
    uppercaseBtn: document.getElementById('uppercaseBtn'),
    lowercaseBtn: document.getElementById('lowercaseBtn'),
    capitalizeBtn: document.getElementById('capitalizeBtn'),
    copyAllBtn: document.getElementById('copyAllBtn'),
    randomExampleBtn: document.getElementById('randomExampleBtn'),
    
    // Search
    searchInput: document.getElementById('searchInput'),
    clearSearch: document.getElementById('clearSearch'),
    
    // Grid & Tabs
    fontsGrid: document.getElementById('fontsGrid'),
    categoryTabs: document.getElementById('categoryTabs'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    loadMoreContainer: document.getElementById('loadMoreContainer'),
    
    // Stats
    statFonts: document.getElementById('statFonts'),
    statCopies: document.getElementById('statCopies'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastIcon: document.getElementById('toastIcon'),
    toastTitle: document.getElementById('toastTitle'),
    toastMessage: document.getElementById('toastMessage'),
    toastClose: document.getElementById('toastClose'),
    
    // Modal
    modal: document.getElementById('fontModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalPreview: document.getElementById('modalPreview'),
    modalInfo: document.getElementById('modalInfo'),
    modalCopyBtn: document.getElementById('modalCopyBtn'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    
    // Typing
    typingText: document.getElementById('typingText'),
    
    // Background
    particlesCanvas: document.getElementById('particlesCanvas')
};

// ===== 130+ FONTS STYLE DATABASE =====
const FontsDatabase = [
    // TIKTOK STYLES (0-14)
    { id: 'tt1', name: 'TikTok Bold', category: 'tiktok', style: 'font-weight: 800; text-transform: uppercase; letter-spacing: 2px; font-family: "Poppins", sans-serif;' },
    { id: 'tt2', name: 'FYP Neon', category: 'tiktok', style: 'font-weight: 700; text-shadow: 0 0 10px #ff0080, 0 0 20px #ff0080; font-family: "Montserrat", sans-serif;' },
    { id: 'tt3', name: 'Viral Glow', category: 'tiktok', style: 'background: linear-gradient(45deg, #ff0080, #00ffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800;' },
    { id: 'tt4', name: 'Trending Now', category: 'tiktok', style: 'font-weight: 800; text-transform: lowercase; font-style: italic; font-family: "Roboto", sans-serif;' },
    { id: 'tt5', name: 'For You Page', category: 'tiktok', style: 'letter-spacing: 5px; font-weight: 300; text-transform: uppercase; font-family: "Oswald", sans-serif;' },
    { id: 'tt6', name: 'Sound On', category: 'tiktok', style: 'font-weight: 900; text-shadow: 3px 3px 0 #ff0080, 6px 6px 0 #00ffff;' },
    { id: 'tt7', name: 'Duet Style', category: 'tiktok', style: 'font-family: "Courier New", monospace; font-weight: bold; transform: skew(-5deg);' },
    { id: 'tt8', name: 'Stitch Mode', category: 'tiktok', style: 'font-size: 1.4rem; font-weight: 800; text-decoration: underline wavy #ff0080;' },
    { id: 'tt9', name: 'Green Screen', category: 'tiktok', style: 'font-family: "Impact", sans-serif; text-transform: uppercase; letter-spacing: 1px;' },
    { id: 'tt10', name: 'POV Style', category: 'tiktok', style: 'font-family: "Arial Black", sans-serif; text-shadow: 2px 2px 0 #ff0080;' },
    { id: 'tt11', name: 'CapCut Style', category: 'tiktok', style: 'font-weight: 700; background: #ff0080; color: white; padding: 2px 5px; display: inline-block;' },
    { id: 'tt12', name: 'Transition', category: 'tiktok', style: 'font-family: "Bebas Neue", cursive; letter-spacing: 3px; text-shadow: 0 0 5px #00ffff;' },
    { id: 'tt13', name: 'Effect Mode', category: 'tiktok', style: 'font-family: "Righteous", cursive; text-transform: uppercase; color: #ff0080;' },
    { id: 'tt14', name: 'Dance Challenge', category: 'tiktok', style: 'font-weight: 800; font-style: italic; text-decoration: underline #00ffff;' },
    { id: 'tt15', name: 'TikTok Sans', category: 'tiktok', style: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-weight: 600;' },

    // INSTAGRAM STYLES (15-29)
    { id: 'ig1', name: 'IG Story', category: 'instagram', style: 'font-family: "Arial Black", sans-serif; text-transform: uppercase; font-size: 1.3rem;' },
    { id: 'ig2', name: 'Reels Bold', category: 'instagram', style: 'font-weight: 800; text-shadow: 2px 2px 0 #ff0080, 4px 4px 0 #00ffff;' },
    { id: 'ig3', name: 'Feed Aesthetic', category: 'instagram', style: 'font-family: "Times New Roman", serif; font-style: italic; color: #f8f8f8;' },
    { id: 'ig4', name: 'Highlight Cover', category: 'instagram', style: 'text-transform: uppercase; letter-spacing: 3px; font-weight: 300;' },
    { id: 'ig5', name: 'Caption Style', category: 'instagram', style: 'font-family: "Helvetica", "Arial", sans-serif; font-weight: 400; line-height: 1.8;' },
    { id: 'ig6', name: 'Explore Page', category: 'instagram', style: 'background: linear-gradient(135deg, #ff0000, #ff00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;' },
    { id: 'ig7', name: 'IGTV Title', category: 'instagram', style: 'font-weight: 800; font-size: 1.6rem; text-transform: uppercase; font-family: "Oswald", sans-serif;' },
    { id: 'ig8', name: 'Bio Font', category: 'instagram', style: 'font-family: "Courier New", monospace; font-size: 0.9rem; color: #b8b8d0;' },
    { id: 'ig9', name: 'Story Highlight', category: 'instagram', style: 'text-shadow: 0 0 5px #ffff00, 0 0 10px #ff00ff;' },
    { id: 'ig10', name: 'Insta Sans', category: 'instagram', style: 'font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 500;' },
    { id: 'ig11', name: 'Filter Vibes', category: 'instagram', style: 'font-family: "Lato", sans-serif; font-weight: 300; font-style: italic;' },
    { id: 'ig12', name: 'B&W Aesthetic', category: 'instagram', style: 'font-family: "Playfair Display", serif; font-weight: 400; color: #cccccc;' },
    { id: 'ig13', name: 'Pastel Dreams', category: 'instagram', style: 'color: #ffb6c1; font-family: "Quicksand", sans-serif; font-weight: 300;' },
    { id: 'ig14', name: 'Grid Style', category: 'instagram', style: 'font-family: "Raleway", sans-serif; text-transform: uppercase; letter-spacing: 4px;' },
    { id: 'ig15', name: 'Insta Classic', category: 'instagram', style: 'font-family: "Georgia", serif; font-style: italic; color: #e0e0e0;' },

    // WHATSAPP STYLES (30-44)
    { id: 'wa1', name: 'WA Bold', category: 'whatsapp', style: 'font-weight: 700; font-family: "Helvetica", "Arial", sans-serif;' },
    { id: 'wa2', name: 'WA Italic', category: 'whatsapp', style: 'font-style: italic; font-family: "Helvetica", "Arial", sans-serif;' },
    { id: 'wa3', name: 'WA Strikethrough', category: 'whatsapp', style: 'text-decoration: line-through; font-family: "Helvetica", "Arial", sans-serif;' },
    { id: 'wa4', name: 'WA Mono', category: 'whatsapp', style: 'font-family: "Courier New", "Courier", monospace;' },
    { id: 'wa5', name: 'WA Status', category: 'whatsapp', style: 'text-transform: uppercase; font-weight: 600; font-family: "Roboto", sans-serif;' },
    { id: 'wa6', name: 'WA Quote', category: 'whatsapp', style: 'font-family: "Georgia", serif; font-style: italic; color: #00ff88;' },
    { id: 'wa7', name: 'WA Broadcast', category: 'whatsapp', style: 'font-weight: 800; letter-spacing: 1px; font-family: "Oswald", sans-serif;' },
    { id: 'wa8', name: 'WA Group', category: 'whatsapp', style: 'background: #00ff88; color: black; padding: 2px 5px; border-radius: 5px; display: inline-block;' },
    { id: 'wa9', name: 'WA Chat', category: 'whatsapp', style: 'font-family: "Segoe UI", "Helvetica", sans-serif;' },
    { id: 'wa10', name: 'WA Story', category: 'whatsapp', style: 'text-shadow: 0 0 3px #00ff88; font-family: "Poppins", sans-serif;' },
    { id: 'wa11', name: 'WA Voice Note', category: 'whatsapp', style: 'font-family: "Arial", sans-serif; font-weight: 600; color: #25D366;' },
    { id: 'wa12', name: 'WA Document', category: 'whatsapp', style: 'font-family: "Courier New", monospace; color: #128C7E;' },
    { id: 'wa13', name: 'WA Location', category: 'whatsapp', style: 'font-family: "Verdana", sans-serif; color: #34B7F1;' },
    { id: 'wa14', name: 'WA Contact', category: 'whatsapp', style: 'font-weight: 700; color: #075E54;' },
    { id: 'wa15', name: 'WA Link', category: 'whatsapp', style: 'color: #039be5; text-decoration: underline; font-family: "Roboto", sans-serif;' },

    // GLITCH STYLES (45-59)
    { id: 'gl1', name: 'Glitch Effect', category: 'glitch', style: 'position: relative; animation: glitchText 1s infinite; font-family: "Courier New", monospace;' },
    { id: 'gl2', name: 'Cyberpunk', category: 'glitch', style: 'text-shadow: -2px 0 #ff0080, 2px 0 #00ffff; font-family: "Orbitron", sans-serif;' },
    { id: 'gl3', name: 'VHS Style', category: 'glitch', style: 'text-shadow: 3px 3px 0 #ff0080, -3px -3px 0 #00ffff;' },
    { id: 'gl4', name: 'Matrix Code', category: 'glitch', style: 'font-family: "Courier New", monospace; color: #00ff00; text-shadow: 0 0 5px #00ff00;' },
    { id: 'gl5', name: 'Static Noise', category: 'glitch', style: 'position: relative; opacity: 0.9; filter: blur(0.5px);' },
    { id: 'gl6', name: 'Double Vision', category: 'glitch', style: 'text-shadow: 4px 4px 0 #ff0000, -4px -4px 0 #00ffff;' },
    { id: 'gl7', name: 'Screen Flicker', category: 'glitch', style: 'animation: flicker 2s infinite;' },
    { id: 'gl8', name: 'RGB Split', category: 'glitch', style: 'text-shadow: 2px 0 0 #ff0000, -2px 0 0 #00ffff;' },
    { id: 'gl9', name: 'Corrupt Text', category: 'glitch', style: 'font-family: "Courier New", monospace; filter: blur(0.2px); transform: rotate(0.5deg);' },
    { id: 'gl10', name: 'Hacker Style', category: 'glitch', style: 'font-family: "Courier New", monospace; color: #00ff00; text-transform: uppercase;' },
    { id: 'gl11', name: 'Digital Distortion', category: 'glitch', style: 'font-family: "Press Start 2P", cursive; font-size: 0.8rem; line-height: 1.5;' },
    { id: 'gl12', name: 'Scan Lines', category: 'glitch', style: 'position: relative; background: repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 2px, transparent 2px, transparent 4px);' },
    { id: 'gl13', name: 'Out of Sync', category: 'glitch', style: 'transform: skewX(-5deg); text-shadow: 2px 2px 0 #ff00ff;' },
    { id: 'gl14', name: 'Pixel Break', category: 'glitch', style: 'font-family: "Press Start 2P", cursive; image-rendering: pixelated;' },
    { id: 'gl15', name: 'Ghost Signal', category: 'glitch', style: 'opacity: 0.8; filter: blur(0.3px); text-shadow: 0 0 10px #00ffff;' },

    // CUTE STYLES (60-74)
    { id: 'ct1', name: 'Kawaii Bold', category: 'cute', style: 'font-weight: 600; color: #ffaaff; font-family: "Comic Sans MS", "Comic Sans", cursive;' },
    { id: 'ct2', name: 'Pastel Pink', category: 'cute', style: 'color: #ffb6c1; text-shadow: 0 0 5px #ff69b4; font-family: "Quicksand", sans-serif;' },
    { id: 'ct3', name: 'Cute Bubble', category: 'cute', style: 'background: #ffaaff; color: white; padding: 5px 10px; border-radius: 20px; display: inline-block;' },
    { id: 'ct4', name: 'Rainbow Text', category: 'cute', style: 'background: linear-gradient(45deg, #ff0000, #ffff00, #00ffff, #ff00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;' },
    { id: 'ct5', name: 'Sparkle Font', category: 'cute', style: 'text-shadow: 0 0 5px #ffff00, 0 0 10px #ffff00; color: #ffffff;' },
    { id: 'ct6', name: 'Cloud Style', category: 'cute', style: 'background: #e0f2fe; color: #0369a1; padding: 5px 10px; border-radius: 30px; display: inline-block;' },
    { id: 'ct7', name: 'Heart Font', category: 'cute', style: 'color: #ff1493; font-weight: 600; font-family: "Dancing Script", cursive;' },
    { id: 'ct8', name: 'Star Glow', category: 'cute', style: 'text-shadow: 0 0 10px #ffd700; color: #fff0b5;' },
    { id: 'ct9', name: 'Candy Style', category: 'cute', style: 'background: linear-gradient(135deg, #f6d5f7, #fbe9d7); color: #d53f8c; padding: 2px 8px; border-radius: 15px;' },
    { id: 'ct10', name: 'Soft Style', category: 'cute', style: 'font-weight: 300; color: #a78bfa; font-family: "Comfortaa", sans-serif;' },
    { id: 'ct11', name: 'Bunny Font', category: 'cute', style: 'font-family: "Pacifico", cursive; color: #f8b4b4;' },
    { id: 'ct12', name: 'Kitty Style', category: 'cute', style: 'font-family: "Lobster", cursive; color: #fd9a9a;' },
    { id: 'ct13', name: 'Unicorn Mode', category: 'cute', style: 'background: linear-gradient(135deg, #c7e9fb, #fbc7f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;' },
    { id: 'ct14', name: 'Cotton Candy', category: 'cute', style: 'color: #b8e2f2; text-shadow: 0 0 5px #fbc7f7;' },
    { id: 'ct15', name: 'Sweet Dreams', category: 'cute', style: 'font-family: "Dancing Script", cursive; font-size: 1.3rem; color: #f9a8d4;' },

    // SAVAGE STYLES (75-89)
    { id: 'sv1', name: 'Savage Bold', category: 'savage', style: 'font-weight: 900; text-transform: uppercase; color: #ff0000; font-family: "Anton", sans-serif;' },
    { id: 'sv2', name: 'Dark Mode', category: 'savage', style: 'color: #000000; text-shadow: 0 0 5px #ff0000; font-weight: 800; background: #333; padding: 2px 5px;' },
    { id: 'sv3', name: 'Toxic Font', category: 'savage', style: 'color: #ff4500; font-weight: 800; text-transform: uppercase; font-family: "Bebas Neue", cursive;' },
    { id: 'sv4', name: 'No Remorse', category: 'savage', style: 'font-family: "Impact", sans-serif; letter-spacing: 2px; color: #8b0000;' },
    { id: 'sv5', name: 'Brutal Style', category: 'savage', style: 'font-weight: 800; text-decoration: line-through #ff0000;' },
    { id: 'sv6', name: 'Savage Sans', category: 'savage', style: 'font-family: "Arial Black", sans-serif; text-transform: uppercase; color: #ff3300;' },
    { id: 'sv7', name: 'Villain Mode', category: 'savage', style: 'color: #2d2d2d; text-shadow: 2px 2px 0 #ff0000;' },
    { id: 'sv8', name: 'Gangster Font', category: 'savage', style: 'font-family: "Courier New", monospace; font-weight: bold; color: #000000; background: #ff0000; padding: 2px 5px; display: inline-block;' },
    { id: 'sv9', name: 'Hardcore', category: 'savage', style: 'font-weight: 800; font-size: 1.5rem; text-transform: uppercase; color: #ff0000;' },
    { id: 'sv10', name: 'Savage Glitch', category: 'savage', style: 'text-shadow: 2px 2px 0 #ff0000, -2px -2px 0 #0000ff;' },
    { id: 'sv11', name: 'Metal Font', category: 'savage', style: 'font-family: "Impact", sans-serif; color: #555555; text-shadow: 2px 2px 0 #aaaaaa;' },
    { id: 'sv12', name: 'Punk Style', category: 'savage', style: 'font-weight: 800; text-decoration: underline wavy #ff0000;' },
    { id: 'sv13', name: 'Rough Text', category: 'savage', style: 'font-family: "Times New Roman", serif; font-weight: 800; color: #8b0000;' },
    { id: 'sv14', name: 'Savage Fire', category: 'savage', style: 'color: #ff4500; text-shadow: 0 0 10px #ff0000;' },
    { id: 'sv15', name: 'Blood Font', category: 'savage', style: 'color: #8b0000; font-weight: 800; text-transform: uppercase;' },

    // GOTHIC STYLES (90-104)
    { id: 'gt1', name: 'Gothic Black', category: 'gothic', style: 'font-family: "UnifrakturMaguntia", "Times New Roman", cursive; color: #4a4a4a;' },
    { id: 'gt2', name: 'Dark Academia', category: 'gothic', style: 'font-family: "Playfair Display", serif; font-weight: 700; color: #5c3b3b;' },
    { id: 'gt3', name: 'Medieval Style', category: 'gothic', style: 'font-family: "Cinzel", serif; letter-spacing: 2px;' },
    { id: 'gt4', name: 'Vampire Font', category: 'gothic', style: 'font-family: "Creepster", cursive; color: #8b0000;' },
    { id: 'gt5', name: 'Horror Text', category: 'gothic', style: 'font-family: "Nosifer", cursive; color: #5a0000;' },
    { id: 'gt6', name: 'Gothic Church', category: 'gothic', style: 'font-family: "UnifrakturMaguntia", cursive;' },
    { id: 'gt7', name: 'Dark Forest', category: 'gothic', style: 'font-family: "Berkshire Swash", cursive; color: #2d5a27;' },
    { id: 'gt8', name: 'Mystic Font', category: 'gothic', style: 'font-family: "Metal Mania", cursive; letter-spacing: 3px;' },
    { id: 'gt9', name: 'Spooky Style', category: 'gothic', style: 'font-family: "Eater", cursive; color: #b86f6f;' },
    { id: 'gt10', name: 'Gothic Rose', category: 'gothic', style: 'font-family: "Cardo", serif; font-style: italic; color: #8b5a5a;' },
    { id: 'gt11', name: 'Dark Castle', category: 'gothic', style: 'font-family: "Cinzel", serif; font-weight: 900; text-transform: uppercase;' },
    { id: 'gt12', name: 'Victorian Style', category: 'gothic', style: 'font-family: "Playfair Display", serif; font-style: italic;' },
    { id: 'gt13', name: 'Graveyard', category: 'gothic', style: 'font-family: "Creepster", cursive; color: #6b4f4f;' },
    { id: 'gt14', name: 'Witch Font', category: 'gothic', style: 'font-family: "Metal Mania", cursive; text-transform: lowercase;' },
    { id: 'gt15', name: 'Gothic Glitch', category: 'gothic', style: 'font-family: "UnifrakturMaguntia", cursive; filter: blur(0.2px);' },

    // HANDWRITING STYLES (105-114)
    { id: 'hw1', name: 'Cursive Flow', category: 'handwriting', style: 'font-family: "Dancing Script", cursive; font-size: 1.3rem;' },
    { id: 'hw2', name: 'Handwritten', category: 'handwriting', style: 'font-family: "Indie Flower", cursive;' },
    { id: 'hw3', name: 'Signature Style', category: 'handwriting', style: 'font-family: "Great Vibes", cursive; font-size: 1.4rem;' },
    { id: 'hw4', name: 'Chalkboard', category: 'handwriting', style: 'font-family: "Comic Sans MS", "Comic Sans", cursive;' },
    { id: 'hw5', name: 'Journal Font', category: 'handwriting', style: 'font-family: "Caveat", cursive;' },
    { id: 'hw6', name: 'Wedding Style', category: 'handwriting', style: 'font-family: "Parisienne", cursive;' },
    { id: 'hw7', name: 'Kids Writing', category: 'handwriting', style: 'font-family: "Architects Daughter", cursive;' },
    { id: 'hw8', name: 'Marker Pen', category: 'handwriting', style: 'font-family: "Permanent Marker", cursive;' },
    { id: 'hw9', name: 'Sketch Style', category: 'handwriting', style: 'font-family: "Kalam", cursive;' },
    { id: 'hw10', name: 'Romantic Script', category: 'handwriting', style: 'font-family: "Allura", cursive;' },

    // RETRO STYLES (115-119)
    { id: 'rt1', name: 'Vintage 70s', category: 'retro', style: 'font-family: "Press Start 2P", cursive; font-size: 0.8rem;' },
    { id: 'rt2', name: '80s Arcade', category: 'retro', style: 'font-family: "VT323", monospace; font-size: 1.3rem;' },
    { id: 'rt3', name: '90s Style', category: 'retro', style: 'font-family: "Comic Sans MS", cursive; color: #00ff00;' },
    { id: 'rt4', name: 'Old School', category: 'retro', style: 'font-family: "Courier New", monospace; font-weight: bold;' },
    { id: 'rt5', name: 'Retro Wave', category: 'retro', style: 'text-shadow: 0 0 5px #ff00ff, 0 0 10px #00ffff;' },

    // FUTURE STYLES (120-124)
    { id: 'ft1', name: 'Cyber Future', category: 'future', style: 'font-family: "Orbitron", sans-serif; letter-spacing: 3px;' },
    { id: 'ft2', name: 'AI Generated', category: 'future', style: 'font-family: "Audiowide", cursive; color: #00ffff;' },
    { id: 'ft3', name: 'Roboto Tech', category: 'future', style: 'font-family: "Roboto Mono", monospace; font-weight: 300;' },
    { id: 'ft4', name: 'Neon Future', category: 'future', style: 'text-shadow: 0 0 10px #ff00ff, 0 0 20px #00ffff;' },
    { id: 'ft5', name: 'Space Age', category: 'future', style: 'font-family: "Exo 2", sans-serif; font-weight: 200; letter-spacing: 4px;' },

    // ASIA STYLES (125-129)
    { id: 'as1', name: 'Japanese Style', category: 'asia', style: 'font-family: "Yuji Syuku", serif;' },
    { id: 'as2', name: 'Chinese Font', category: 'asia', style: 'font-family: "Noto Serif SC", serif;' },
    { id: 'as3', name: 'Korean Style', category: 'asia', style: 'font-family: "Black Han Sans", sans-serif;' },
    { id: 'as4', name: 'Anime Font', category: 'asia', style: 'font-family: "Comic Neue", cursive; letter-spacing: 1px;' },
    { id: 'as5', name: 'Manga Style', category: 'asia', style: 'font-family: "Press Start 2P", cursive; font-size: 0.7rem;' }
];

// ===== ANIMATION KEYFRAMES =====
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitchText {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
        }
        
        @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
            51% { opacity: 1; }
            80% { opacity: 0.9; }
        }
    `;
    document.head.appendChild(style);
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🔥 AGUS SLEBEW FONTS v3.0 RELOAD 🔥', 'color: #ff0080; font-size: 20px; font-weight: bold;');
    console.log('%c😋 130+ Font Styles Siap Dipakai!', 'color: #00ffff; font-size: 16px;');
    
    // Add animations
    addAnimationStyles();
    
    // Initialize data
    AppState.fonts = FontsDatabase;
    AppState.filteredFonts = FontsDatabase;
    
    // Set max char
    if (DOM.maxChar) DOM.maxChar.textContent = '500';
    
    // Initialize UI
    initEventListeners();
    updateCharCount();
    updateLivePreview();
    initTypingAnimation();
    initParticles();
    updateStats();
    
    // Render fonts
    renderFonts();
    
    // Load last text from localStorage
    loadLastText();
});

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Input
    if (DOM.inputText) {
        DOM.inputText.addEventListener('input', handleInput);
    }
    
    // Buttons
    if (DOM.clearBtn) DOM.clearBtn.addEventListener('click', clearInput);
    if (DOM.resetBtn) DOM.resetBtn.addEventListener('click', resetToDefault);
    if (DOM.uppercaseBtn) DOM.uppercaseBtn.addEventListener('click', () => transformText('uppercase'));
    if (DOM.lowercaseBtn) DOM.lowercaseBtn.addEventListener('click', () => transformText('lowercase'));
    if (DOM.capitalizeBtn) DOM.capitalizeBtn.addEventListener('click', () => transformText('capitalize'));
    if (DOM.copyAllBtn) DOM.copyAllBtn.addEventListener('click', copyAllFonts);
    if (DOM.randomExampleBtn) DOM.randomExampleBtn.addEventListener('click', randomExample);
    
    // Search
    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', handleSearch);
        DOM.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                clearSearch();
            }
        });
    }
    if (DOM.clearSearch) DOM.clearSearch.addEventListener('click', clearSearch);
    
    // Category tabs
    if (DOM.categoryTabs) {
        DOM.categoryTabs.addEventListener('click', handleCategoryClick);
    }
    
    // Load more
    if (DOM.loadMoreBtn) {
        DOM.loadMoreBtn.addEventListener('click', loadMoreFonts);
    }
    
    // Toast close
    if (DOM.toastClose) {
        DOM.toastClose.addEventListener('click', () => {
            DOM.toast.classList.remove('show');
        });
    }
    
    // Modal buttons
    if (DOM.modalCopyBtn) DOM.modalCopyBtn.addEventListener('click', copyCurrentFont);
    if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeModal);
    if (DOM.closeModalBtn) DOM.closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === DOM.modal) {
            closeModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// ===== INPUT HANDLING =====
function handleInput(e) {
    AppState.inputText = e.target.value;
    
    // Limit to 500 chars
    if (AppState.inputText.length > 500) {
        AppState.inputText = AppState.inputText.substring(0, 500);
        DOM.inputText.value = AppState.inputText;
    }
    
    updateCharCount();
    updateLivePreview();
    
    // Debounce render
    clearTimeout(AppState.typingTimer);
    AppState.typingTimer = setTimeout(() => {
        renderFonts();
    }, 100);
    
    // Save to localStorage
    localStorage.setItem('agusLastText_v3', AppState.inputText);
}

function updateCharCount() {
    if (!DOM.charCount) return;
    const length = AppState.inputText.length;
    DOM.charCount.textContent = length;
    
    // Visual warning
    if (length > 450) {
        DOM.charCount.style.color = '#ff3300';
    } else if (length > 400) {
        DOM.charCount.style.color = '#ff7700';
    } else {
        DOM.charCount.style.color = '';
    }
}

function updateLivePreview() {
    if (!DOM.livePreview) return;
    DOM.livePreview.textContent = AppState.inputText || 'Halo Bro!';
}

function loadLastText() {
    const lastText = localStorage.getItem('agusLastText_v3');
    if (lastText && DOM.inputText) {
        AppState.inputText = lastText;
        DOM.inputText.value = lastText;
        updateCharCount();
        updateLivePreview();
    }
}

// ===== TEXT TRANSFORMATIONS =====
function transformText(type) {
    let text = AppState.inputText;
    
    switch(type) {
        case 'uppercase':
            text = text.toUpperCase();
            break;
        case 'lowercase':
            text = text.toLowerCase();
            break;
        case 'capitalize':
            text = text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
            break;
    }
    
    AppState.inputText = text;
    DOM.inputText.value = text;
    updateCharCount();
    updateLivePreview();
    renderFonts();
    
    const messages = {
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize'
    };
    showToast('✨ Teks diubah!', `Teks diubah ke ${messages[type]}`, 'success');
    
    // Save to localStorage
    localStorage.setItem('agusLastText_v3', text);
}

// ===== INPUT ACTIONS =====
function clearInput() {
    AppState.inputText = '';
    DOM.inputText.value = '';
    updateCharCount();
    updateLivePreview();
    renderFonts();
    showToast('🧹 Dibersihkan!', 'Teks berhasil dibersihkan', 'info');
    localStorage.setItem('agusLastText_v3', '');
}

function resetToDefault() {
    AppState.inputText = 'Halo Bro, ini teks keren buat TikTok!';
    DOM.inputText.value = AppState.inputText;
    updateCharCount();
    updateLivePreview();
    renderFonts();
    showToast('✨ Reset!', 'Kembali ke teks default', 'success');
    localStorage.setItem('agusLastText_v3', AppState.inputText);
}

function randomExample() {
    const examples = [
        'Halo Bro, ini teks keren buat TikTok!',
        'Malam minggu sendirian? Santuy aja! 🔥',
        'Fakta unik: lu keren banget hari ini 😎',
        'Story time: jaman dulu gue pernah...',
        'Quote galau: kadang yang pergi bikin pengertian',
        'Savage mode: bodo amat sama yang toxic! 😈',
        'Cute vibes: kamu manis kayak permen 🍭',
        'Glitch effect: ERROR 404 NOT FOUND',
        'TikTok viral: ini dia yang lagi trend!',
        'Ig story: dokumentasi hari ini #fyp'
    ];
    
    const random = examples[Math.floor(Math.random() * examples.length)];
    AppState.inputText = random;
    DOM.inputText.value = random;
    updateCharCount();
    updateLivePreview();
    renderFonts();
    showToast('🎲 Random!', 'Teks random dipilih', 'info');
    localStorage.setItem('agusLastText_v3', random);
}

// ===== SEARCH HANDLING =====
function handleSearch(e) {
    AppState.searchQuery = e.target.value.toLowerCase().trim();
    
    // Clear previous timer
    clearTimeout(AppState.searchTimer);
    
    // Debounce search
    AppState.searchTimer = setTimeout(() => {
        filterFonts();
        resetVisibleFonts();
        renderFonts();
        
        if (AppState.searchQuery) {
            showToast('🔍 Mencari...', `Ditemukan ${AppState.filteredFonts.length} fonts`, 'info');
        }
    }, 300);
}

function clearSearch() {
    AppState.searchQuery = '';
    if (DOM.searchInput) {
        DOM.searchInput.value = '';
    }
    filterFonts();
    resetVisibleFonts();
    renderFonts();
    showToast('🔍 Dibersihkan', 'Pencarian direset', 'info');
}

// ===== CATEGORY HANDLING =====
function handleCategoryClick(e) {
    const tab = e.target.closest('.category-tab');
    if (!tab) return;
    
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Update category
    AppState.currentCategory = tab.dataset.category;
    
    // Reset search query
    AppState.searchQuery = '';
    if (DOM.searchInput) {
        DOM.searchInput.value = '';
    }
    
    filterFonts();
    resetVisibleFonts();
    renderFonts();
}

// ===== FILTER FONTS =====
function filterFonts() {
    let filtered = AppState.fonts;
    
    // Filter by category
    if (AppState.currentCategory !== 'all') {
        filtered = filtered.filter(f => f.category === AppState.currentCategory);
    }
    
    // Filter by search
    if (AppState.searchQuery) {
        filtered = filtered.filter(f => 
            f.name.toLowerCase().includes(AppState.searchQuery) ||
            f.category.toLowerCase().includes(AppState.searchQuery)
        );
    }
    
    AppState.filteredFonts = filtered;
}

function resetVisibleFonts() {
    AppState.visibleFonts = 20;
    if (DOM.loadMoreContainer) {
        if (AppState.filteredFonts.length > 20) {
            DOM.loadMoreContainer.style.display = 'block';
        } else {
            DOM.loadMoreContainer.style.display = 'none';
        }
    }
}

function loadMoreFonts() {
    AppState.visibleFonts += 20;
    renderFonts();
    
    if (AppState.visibleFonts >= AppState.filteredFonts.length) {
        if (DOM.loadMoreContainer) {
            DOM.loadMoreContainer.style.display = 'none';
        }
    }
}

// ===== RENDER FONTS =====
function renderFonts() {
    if (!DOM.fontsGrid) return;
    
    const fontsToShow = AppState.filteredFonts.slice(0, AppState.visibleFonts);
    
    if (fontsToShow.length === 0) {
        DOM.fontsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Tidak ada fonts ditemukan</h3>
                <p>Coba kata kunci atau kategori lain</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    fontsToShow.forEach((font, index) => {
        const globalIndex = AppState.filteredFonts.indexOf(font);
        html += `
            <div class="font-card" onclick="window.openFontModal(${globalIndex})">
                <div class="font-header">
                    <span class="font-name">
                        <i class="fas fa-tag"></i> ${font.name}
                    </span>
                    <span class="font-category">
                        <i class="fas ${getCategoryIcon(font.category)}"></i> ${font.category}
                    </span>
                </div>
                <div class="font-preview" style="${font.style}">
                    ${escapeHtml(AppState.inputText || 'Halo Bro!')}
                </div>
                <div class="font-actions">
                    <button class="font-copy-btn" onclick="window.copyFont(${globalIndex}); event.stopPropagation();">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    DOM.fontsGrid.innerHTML = html;
    
    // Update stat fonts
    if (DOM.statFonts) {
        DOM.statFonts.textContent = AppState.filteredFonts.length;
    }
}

function getCategoryIcon(category) {
    const icons = {
        'tiktok': 'fab fa-tiktok',
        'instagram': 'fab fa-instagram',
        'whatsapp': 'fab fa-whatsapp',
        'glitch': 'fas fa-bolt',
        'cute': 'fas fa-heart',
        'savage': 'fas fa-skull',
        'gothic': 'fas fa-church',
        'handwriting': 'fas fa-pen-fancy',
        'retro': 'fas fa-record-vinyl',
        'future': 'fas fa-robot',
        'asia': 'fas fa-dragon'
    };
    return icons[category] || 'fas fa-font';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== COPY FUNCTIONS =====
window.copyFont = (index) => {
    if (!AppState.filteredFonts[index]) return;
    
    const font = AppState.filteredFonts[index];
    const text = AppState.inputText || 'Halo Bro!';
    
    navigator.clipboard.writeText(text).then(() => {
        // Update counter
        AppState.copiesCount++;
        updateStats();
        localStorage.setItem('agusCopies_v3', AppState.copiesCount);
        
        // Show toast
        showToast('✅ Berhasil!', `Font "${font.name}" dicopy`, 'success');
    }).catch(() => {
        showToast('❌ Gagal!', 'Gagal copy teks', 'error');
    });
};

function copyAllFonts() {
    const text = AppState.inputText || 'Halo Bro!';
    const count = AppState.filteredFonts.length;
    
    navigator.clipboard.writeText(text).then(() => {
        // Update counter
        AppState.copiesCount += count;
        updateStats();
        localStorage.setItem('agusCopies_v3', AppState.copiesCount);
        
        // Show toast
        showToast('✅ Berhasil!', `Teks siap dicopy ke ${count} font`, 'success');
    }).catch(() => {
        showToast('❌ Gagal!', 'Gagal copy teks', 'error');
    });
}

// ===== MODAL FUNCTIONS =====
window.openFontModal = (index) => {
    if (!AppState.filteredFonts[index]) return;
    
    const font = AppState.filteredFonts[index];
    AppState.currentFont = font;
    AppState.isModalOpen = true;
    
    // Set modal content
    if (DOM.modalTitle) DOM.modalTitle.textContent = font.name;
    if (DOM.modalPreview) {
        DOM.modalPreview.style.cssText = font.style;
        DOM.modalPreview.textContent = AppState.inputText || 'Halo Bro!';
    }
    if (DOM.modalInfo) {
        DOM.modalInfo.innerHTML = `
            <p><strong>Kategori:</strong> <i class="fas ${getCategoryIcon(font.category)}"></i> ${font.category}</p>
            <p><strong>Style:</strong> <code>${escapeHtml(font.style)}</code></p>
            <p><strong>Total fonts:</strong> ${AppState.filteredFonts.length} dari ${AppState.fonts.length}</p>
        `;
    }
    
    // Show modal
    if (DOM.modal) {
        DOM.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
};

function closeModal() {
    if (DOM.modal) {
        DOM.modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    AppState.isModalOpen = false;
    AppState.currentFont = null;
}

function copyCurrentFont() {
    if (AppState.currentFont) {
        const text = AppState.inputText || 'Halo Bro!';
        navigator.clipboard.writeText(text).then(() => {
            AppState.copiesCount++;
            updateStats();
            localStorage.setItem('agusCopies_v3', AppState.copiesCount);
            showToast('✅ Berhasil!', `Font "${AppState.currentFont.name}" dicopy`, 'success');
            closeModal();
        });
    }
}

// ===== STATS FUNCTIONS =====
function updateStats() {
    if (DOM.statCopies) {
        DOM.statCopies.textContent = AppState.copiesCount.toLocaleString();
    }
    if (DOM.statFonts) {
        DOM.statFonts.textContent = AppState.filteredFonts.length;
    }
}

// ===== TOAST NOTIFICATION =====
function showToast(title, message, type = 'success') {
    if (!DOM.toast || !DOM.toastTitle || !DOM.toastMessage || !DOM.toastIcon) return;
    
    DOM.toastTitle.textContent = title;
    DOM.toastMessage.textContent = message;
    
    // Set icon and color based on type
    if (type === 'error') {
        DOM.toastIcon.className = 'fas fa-exclamation-circle';
        DOM.toast.style.background = 'linear-gradient(135deg, #ff3300, #ff0080)';
    } else if (type === 'info') {
        DOM.toastIcon.className = 'fas fa-info-circle';
        DOM.toast.style.background = 'linear-gradient(135deg, #00c3ff, #0080ff)';
    } else {
        DOM.toastIcon.className = 'fas fa-check-circle';
        DOM.toast.style.background = 'linear-gradient(135deg, #ff0080, #b300ff)';
    }
    
    DOM.toast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        DOM.toast.classList.remove('show');
    }, 3000);
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    if (!DOM.typingText) return;
    
    const texts = [
        '130+ Font Styles Siap Dipakai!',
        'Dibuat oleh Agus Slebew 😋',
        'Free Forever! No Sensor!',
        'TikTok, IG, WA, & Lainnya',
        'Gas Pol Abis! 🔥',
        'Copy Paste Doang Bro!'
    ];
    
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[index];
        
        if (isDeleting) {
            DOM.typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            DOM.typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    type();
}

// ===== PARTICLES BACKGROUND =====
function initParticles() {
    if (!DOM.particlesCanvas) return;
    
    const canvas = DOM.particlesCanvas;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 255)}, `
            });
        }
    }
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 0, 128, ${p.opacity})`;
            ctx.fill();
            
            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Wrap around screen
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        });
        
        requestAnimationFrame(draw);
    }
    
    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
    
    resize();
    createParticles();
    draw();
}

// ===== KEYBOARD SHORTCUTS =====
function handleKeyboardShortcuts(e) {
    // Don't trigger if in input or modal
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || AppState.isModalOpen) {
        return;
    }
    
    // Ctrl/Cmd + Enter = Copy all
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        copyAllFonts();
    }
    
    // Ctrl/Cmd + Shift + C = Copy first font
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        if (AppState.filteredFonts.length > 0) {
            window.copyFont(0);
        }
    }
    
    // Ctrl/Cmd + F = Focus search (prevent browser search)
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        if (DOM.searchInput) {
            DOM.searchInput.focus();
        }
    }
    
    // Escape = Close modal
    if (e.key === 'Escape' && AppState.isModalOpen) {
        closeModal();
    }
    
    // Ctrl/Cmd + U = Uppercase
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        transformText('uppercase');
    }
    
    // Ctrl/Cmd + L = Lowercase
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        transformText('lowercase');
    }
    
    // Ctrl/Cmd + P = Capitalize
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        transformText('capitalize');
    }
    
    // Ctrl/Cmd + E = Clear input
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        clearInput();
    }
    
    // Ctrl/Cmd + R = Reset (prevent browser refresh)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        resetToDefault();
    }
}

// ===== EXPOSE GLOBALLY =====
window.copyFont = copyFont;
window.openFontModal = openFontModal;

// ===== CONSOLE EASTER EGGS =====
console.log('%c🔥 AGUS SLEBEW SECRET COMMANDS 🔥', 'color: #ff0080; font-size: 16px; font-weight: bold;');
console.log('%c▶️ savageMode() - Aktifin mode brutal', 'color: #ff7700;');
console.log('%c▶️ showStats() - Lihat statistik lengkap', 'color: #00ffff;');
console.log('%c▶️ resetCounter() - Reset copy counter', 'color: #ff3300;');
console.log('%c▶️ listCategories() - Lihat semua kategori', 'color: #00ff88;');

window.savageMode = () => {
    const savageTab = document.querySelector('[data-category="savage"]');
    if (savageTab) {
        savageTab.click();
        showToast('😈 SAVAGE MODE!', 'Mode brutal diaktifkan', 'error');
    }
};

window.showStats = () => {
    console.table({
        'Total Fonts': AppState.fonts.length,
        'Filtered Fonts': AppState.filteredFonts.length,
        'Total Copies': AppState.copiesCount,
        'Current Category': AppState.currentCategory,
        'Search Query': AppState.searchQuery || '-',
        'Visible Fonts': AppState.visibleFonts
    });
};

window.resetCounter = () => {
    AppState.copiesCount = 0;
    localStorage.setItem('agusCopies_v3', '0');
    updateStats();
    showToast('🔄 Counter direset!', 'Copy counter kembali ke 0', 'info');
};

window.listCategories = () => {
    const categories = [...new Set(AppState.fonts.map(f => f.category))];
    console.log('📁 Kategori tersedia:', categories);
    return categories;
};

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('🔥 Error caught:', e.error);
    showToast('⚠️ Error', 'Terjadi kesalahan, refresh mungkin membantu', 'error');
});
