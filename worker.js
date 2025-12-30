export default {
  async fetch(request) {
    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eco-Orchard: Advanced Biology</title>
    <style>
        :root {
            --primary: #2ecc71; --dark: #27ae60; --soil: #795548; --water: #29b6f6;
            --warning: #e74c3c; --text: #37474f; --bg: #f1f8e9;
        }
         body { 
               font-family: 'Segoe UI', Tahoma, sans-serif; 
               
               background: linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('https://wallpapers.com/images/high/vibrant-farm-fields-153x42spur474fsc.webp') no-repeat center center fixed;
               background-size: cover;
               color: var(--text); 
               margin: 0; 
               padding: 0; 
               user-select: none; 
           }
        
        /* HUD */
        .header { background: white; padding: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 100; display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; }
        .stat-box { display: flex; align-items: center; gap: 6px; font-weight: 600; background: #fff; padding: 6px 12px; border-radius: 30px; border: 1px solid #e0e0e0; font-size: 0.9em; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
        
        /* Layout */
        .container { max-width: 900px; margin: 0 auto; padding: 20px; }
        
        /* The Field */
        .farm-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px; }
        .plot { 
            aspect-ratio: 1; background: var(--soil); border-radius: 12px; position: relative; 
            cursor: pointer; transition: all 0.2s; border-bottom: 6px solid #5d4037; overflow: hidden;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
        }
        .plot:active { transform: translateY(2px); border-bottom-width: 2px; }
        .plot.dry { filter: sepia(0.6); }
        .plot.pest-infested { border: 4px solid var(--warning); animation: shake 0.5s infinite; }
        
        /* Plant & UI elements within plot */
        .plant { font-size: 3.5em; z-index: 2; transition: transform 0.3s; }
        .pest-icon { position: absolute; top: 5px; right: 5px; font-size: 1.5em; z-index: 5; background: rgba(255,255,255,0.8); border-radius: 50%; padding: 2px; }
        .rotation-warning { position: absolute; top: 5px; left: 5px; font-size: 1.2em; z-index: 4; title:"Monoculture Warning"; }
        .progress-bar { position: absolute; bottom: 0; left: 0; height: 6px; background: linear-gradient(90deg, #a5d6a7, #2ecc71); width: 0%; transition: width 0.2s linear; z-index: 1; }
        .soil-label { font-size: 0.7em; color: rgba(255,255,255,0.7); margin-top: -5px; z-index: 2; }

        /* Controls */
        .controls { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .tabs { display: flex; gap: 15px; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; }
        .tab-btn { border: none; background: none; font-weight: 700; color: #90a4ae; cursor: pointer; padding: 10px 20px; font-size: 1rem; transition: color 0.2s; }
        .tab-btn.active { color: var(--dark); border-bottom: 3px solid var(--dark); margin-bottom: -2px; }
        
        .panel { display: none; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
        .panel.active { display: grid; }
        
        /* Cards */
        .card { border: 1px solid #f0f0f0; background: #fff; padding: 12px; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.2s; position: relative; display: flex; flex-direction: column; justify-content: space-between; }
        .card:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.08); border-color: var(--primary); }
        .card.special { background: #e8f5e9; border: 1px dashed var(--dark); }
        .card h4 { margin: 8px 0 4px 0; font-size: 0.95em; color: var(--text); }
        .meta { font-size: 0.75em; color: #78909c; line-height: 1.4; }
        .price-tag { display: inline-block; background: #eceff1; padding: 2px 8px; border-radius: 4px; font-weight: bold; color: var(--text); margin-top: 5px; font-size: 0.8em; }

        /* Modals */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(3px); display: none; justify-content: center; align-items: center; z-index: 1000; }
        .modal { background: white; padding: 30px; border-radius: 20px; max-width: 450px; width: 90%; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.2); animation: popIn 0.3s; }
        .modal h2 { color: var(--dark); margin: 0 0 15px 0; }
        .intro-tags { margin: 15px 0; display: flex; flex-direction: column; gap: 8px; align-items: center; }
        .tag { background: #e8f5e9; color: #2e7d32; padding: 6px 15px; border-radius: 20px; font-size: 0.9em; font-weight: 600; letter-spacing: 0.5px; }
        
        .choice-btn { width: 100%; padding: 12px; margin: 8px 0; border: 2px solid #eee; border-radius: 10px; background: white; cursor: pointer; text-align: left; transition: 0.2s; }
        .choice-btn:hover { border-color: var(--primary); background: #f9f9f9; }
        .choice-btn strong { display: block; font-size: 1.1em; }
        .btn-primary { background: var(--primary); color: white; border: none; padding: 12px 30px; border-radius: 8px; font-size: 1.1em; font-weight: bold; cursor: pointer; margin-top: 20px; }
        
        .toast { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #37474f; color: white; padding: 12px 25px; border-radius: 30px; opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 200; font-weight: 500; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }

        @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes shake { 0% { transform: translate(1px, 1px) rotate(0deg); } 50% { transform: translate(-1px, -1px) rotate(2deg); } 100% { transform: translate(1px, 1px) rotate(0deg); } }

        @media (max-width: 600px) { .farm-grid { gap: 8px; } .plant { font-size: 2.5em; } }
    </style>
</head>
<body>

<div class="header">
    <div class="stat-box">💰 <span id="money">100</span></div>
    <div class="stat-box">🌱 Eco: <span id="eco">60</span>/100</div>
    <div class="stat-box">💧 Water: <span id="water">100</span></div>
    <div class="stat-box">🧪 Soil N: <span id="soil">100</span>%</div>
</div>

<div class="container">
    <div class="farm-grid" id="farmGrid">
        <!-- JS Generated Plots -->
    </div>

    <div class="controls">
        <div class="tabs">
            <button class="tab-btn active" onclick="switchTab('seeds')">🌱 Seeds (Biology)</button>
            <button class="tab-btn" onclick="switchTab('tech')">🚜 Tech & Actions</button>
        </div>

        <div id="seeds" class="panel active">
            <!-- JS Generated Seeds -->
        </div>

        <div id="tech" class="panel">
            <div class="card" onclick="buyUpgrade('rainwater')">
                <div style="font-size:2em">🌧️</div>
                <h4>Rain Harvesting</h4>
                <div class="meta">Passively restores water.</div>
                <div class="price-tag">💰 150</div>
            </div>
            <div class="card" onclick="performAction('compost')">
                <div style="font-size:2em">🍂</div>
                <h4>Organic Compost</h4>
                <div class="meta">Recycle waste into Nitrogen.</div>
                <div class="price-tag">💰 15 | +20% Soil N</div>
            </div>
            <div class="card" onclick="buyUpgrade('bees')">
                <div style="font-size:2em">🐝</div>
                <h4>Pollinator Strip</h4>
                <div class="meta">Biodiversity boost. Growth +20%.</div>
                <div class="price-tag">💰 200</div>
            </div>
        </div>
    </div>
</div>

<!-- Intro Modal -->
<div class="modal-overlay" id="introOverlay" style="display: flex;">
    <div class="modal">
        <div style="font-size: 3em; margin-bottom: 10px;">🌏</div>
        <h2>Eco-Orchard: Advanced Biology</h2>
        <div class="intro-tags">
        <div class="tag">COURSE: PRT2009-11</div>
        <div class="tag">By Group 2</div>
    
        <div class="how-to-play">
            <b>How to Play</b><br>
            1. <b>Plant & Rotate</b>: Choose seeds → click plot.<br>
            2. <b>Soil N</b>: Fruit crops reduce N. Plant Long Beans (legumes).<br>
            3. <b>Pests</b>: Red plot = aphids. Use Biological Control (ladybugs).<br>
            4. <b>Harvest</b>: Click mature crops for Money & Eco-points.
        </div>
    </div>
    
    
        <p style="color: #666; line-height: 1.6; margin: 20px 0;">
            Manage a sustainable agro-ecosystem. <br>
            Master <b>Crop Rotation</b>, <b>Nitrogen Fixation</b>, and <b>Integrated Pest Management (IPM)</b>.
        </p>
        <button class="btn-primary" onclick="startGame()">Start Simulation</button>
    </div>
</div>

<!-- Pest Control Modal (IPM) -->
<div class="modal-overlay" id="ipmModal">
    <div class="modal">
        <div style="font-size: 3em;">🐛</div>
        <h2>Pest Outbreak!</h2>
        <p>Aphids are attacking your crop. Choose an IPM strategy:</p>
        
        <button class="choice-btn" onclick="resolvePest('chemical')">
            <strong>🛢️ Chemical Pesticide</strong>
            <span style="color:#e74c3c; font-size:0.9em;">Cost: 💰5 | Soil N -10 | Eco -5</span><br>
            <i style="font-size:0.8em; color:#999">Fast, but harmful to the ecosystem.</i>
        </button>

        <button class="choice-btn" onclick="resolvePest('bio')">
            <strong>🐞 Biological Control (Ladybugs)</strong>
            <span style="color:#2ecc71; font-size:0.9em;">Cost: 💰25 | Eco +5</span><br>
            <i style="font-size:0.8em; color:#999">Natural predators. Safe & Sustainable.</i>
        </button>
        
        <button class="choice-btn" onclick="closeModal('ipmModal')">Cancel</button>
    </div>
</div>

<!-- Generic Info Modal -->
<div class="modal-overlay" id="infoModal">
    <div class="modal">
        <div style="font-size: 3em;" id="infoIcon">💡</div>
        <h2 id="infoTitle">Title</h2>
        <p id="infoText" style="line-height: 1.6; color:#546e7a">Content</p>
        <button class="btn-primary" onclick="closeModal('infoModal')">Understood</button>
    </div>
</div>

<div class="toast" id="toast">Notification</div>

<script>
    // --- Biological Data ---
    const CROPS = [
        // Cash Crops
        { id: 'papaya', name: 'Papaya', emoji: '🍈', price: 10, sell: 20, time: 3000, water: 10, soil: 8, eco: 1, type: 'fruit', desc: 'High Vit-C. Vulnerable to aphids.' },
        { id: 'guava', name: 'Guava', emoji: '🍏', price: 20, sell: 40, time: 5000, water: 15, soil: 12, eco: 2, type: 'fruit', desc: 'Native superfood.' },
        { id: 'mango', name: 'Mango', emoji: '🥭', price: 80, sell: 150, time: 10000, water: 25, soil: 15, eco: 4, type: 'fruit', desc: 'Deep roots prevent erosion.' },
        { id: 'durian', name: 'Durian', emoji: '🧀', price: 150, sell: 320, time: 15000, water: 40, soil: 25, eco: 5, type: 'fruit', desc: 'Requires pollinators.' },
        
        // Cover Crop (Biology Feature: Nitrogen Fixation)
        { id: 'legume', name: 'Long Beans', emoji: '🌿', price: 5, sell: 8, time: 4000, water: 5, soil: -30, eco: 5, type: 'legume', desc: 'Legume. Fixes Nitrogen (Restores Soil).' }
    ];

    // --- State ---
    let state = {
        money: 100,
        eco: 60,
        water: 100,
        soil: 100, // Represents Nitrogen (N) levels
        plots: Array(6).fill(null), // { cropId, start, totalTime, ready, hasPest, lastCropId }
        upgrades: { rainwater: false, bees: false },
        selectedSeed: null,
        activePestPlotIndex: null,
        gameRunning: false
    };

    // --- Core Loops ---
    function startGame() {
        document.getElementById('introOverlay').style.display = 'none';
        state.gameRunning = true;
        renderUI();
        gameLoop();
        showToast("Welcome! Select seeds to start planting.");
    }

    function gameLoop() {
        setInterval(() => {
            if (!state.gameRunning) return;
            
            const now = Date.now();
            let dirty = false;

            // 1. Water Regeneration
            if (state.water < 100) {
                state.water += state.upgrades.rainwater ? 0.4 : 0.05;
                dirty = true;
            }

            // 2. Crop Growth & Pests
            state.plots.forEach((p, idx) => {
                if (p && !p.ready && !p.hasPest) {
                    const elapsed = now - p.start;
                    
                    // Pest Mechanic (Random Event)
                    // 0.5% chance per tick to get infested if not a legume
                    if (Math.random() < 0.005 && p.type !== 'legume' && elapsed > 1000) {
                        p.hasPest = true;
                        dirty = true;
                        if(Math.random() > 0.5) showToast("⚠️ Pest Alert! Check your fields!");
                    }

                    if (elapsed >= p.totalTime) {
                        p.ready = true;
                        dirty = true;
                    }
                    
                    // Update DOM directly for smooth bar
                    const bar = document.getElementById('prog-' + idx);
                    if (bar) bar.style.width = Math.min(100, (elapsed / p.totalTime) * 100) + '%';
                }
            });

            if (dirty) updateHUD();
            // Note: We only re-render grid on major events to save performance, 
            // but we update classes for pests/ready dynamically below
            updateGridVisuals();

        }, 100);
    }

    // --- Interaction Logic ---
    function selectSeed(id) {
        state.selectedSeed = id;
        renderSeeds(); // to update selection border
        const crop = CROPS.find(c => c.id === id);
        showToast(\`Selected: \${crop.name}. \${crop.type === 'legume' ? 'Restores Soil N!' : ''}\`);
    }

    function handlePlot(idx) {
        const plot = state.plots[idx];

        // 1. Plant
        if (!plot) {
            if (!state.selectedSeed) return showToast("Select a seed first.");
            plantCrop(idx, state.selectedSeed);
            return;
        }

        // 2. Manage Pests (IPM)
        if (plot.hasPest) {
            state.activePestPlotIndex = idx;
            document.getElementById('ipmModal').style.display = 'flex';
            return;
        }

        // 3. Harvest
        if (plot.ready) {
            harvestCrop(idx);
            return;
        }

        showToast("Growing... " + (state.upgrades.bees ? "(Bees active 🐝)" : ""));
    }

    function plantCrop(idx, cropId) {
        const crop = CROPS.find(c => c.id === cropId);
        
        // Resource Checks
        if (state.money < crop.price) return showToast("Not enough money!");
        if (state.water < crop.water) return showToast("Water too low!");
        // Legumes can grow in bad soil, fruits cannot
        if (crop.type !== 'legume' && state.soil < 10) return showToast("Soil depleted! Plant Legumes or Compost.");

        // Deduct Resources
        state.money -= crop.price;
        state.water -= crop.water;

        // Crop Rotation Logic
        const lastCrop = state.plots[idx] ? state.plots[idx].lastCropId : null;
        const isMonoculture = (lastCrop === cropId && crop.type !== 'legume'); // Legumes don't care
        
        // Initialize Plot
        state.plots[idx] = {
            cropId: cropId,
            type: crop.type,
            start: Date.now(),
            totalTime: state.upgrades.bees ? crop.time * 0.8 : crop.time,
            ready: false,
            hasPest: false,
            lastCropId: lastCrop, // preserve history for now, update on harvest
            isMonoculture: isMonoculture
        };

        if (isMonoculture) showToast("⚠️ Monoculture: Yield will be reduced!");

        state.selectedSeed = null;
        renderUI();
    }

    function harvestCrop(idx) {
        const plot = state.plots[idx];
        const crop = CROPS.find(c => c.id === plot.cropId);

        // Rotation Penalty Calculation
        let yieldMoney = crop.sell;
        if (plot.isMonoculture) {
            yieldMoney = Math.floor(yieldMoney * 0.7); // 30% penalty
        }

        // Update Stats
        state.money += yieldMoney;
        state.eco = Math.min(100, state.eco + crop.eco);
        
        // Soil Logic (Nitrogen Cycle)
        // If Legume: RESTORE soil (negative cost). If Fruit: CONSUME soil.
        state.soil = Math.min(100, Math.max(0, state.soil - crop.soil));

        // Educational Popups
        if (crop.type === 'legume') {
            showInfo("Nitrogen Fixation 🌿", "Legumes have root nodules containing bacteria (Rhizobia) that fix atmospheric nitrogen into the soil, acting as a natural fertilizer!");
        } else if (plot.isMonoculture && Math.random() > 0.5) {
            showInfo("Crop Rotation Alert 📉", "Planting the same crop continuously depletes specific nutrients and encourages pathogen buildup. Rotate crops to maintain high yields!");
        }

        // Clear plot but save history for rotation logic
        state.plots[idx] = null;
        // Hacky way to store history in the null slot for next plant? 
        // Better: store history in a separate array or keep object but mark empty.
        // Let's keep the object logic simpler:
        // actually, we need to persist the lastCropId even if plot is null.
        // We will modify the plots array structure slightly.
        // Correction: Let's store history in the DOM or a separate state array.
        // Implementation: When clearing, we leave a marker in state.plots? No, let's use a history object.
        // SIMPLE FIX: We won't clear to null, we'll keep a 'ghost' object? No.
        // Let's add a 'history' array to state.
        if (!state.plotHistory) state.plotHistory = [null,null,null,null,null,null];
        state.plotHistory[idx] = crop.id;

        // NOW actual clear
        state.plots[idx] = null; // Visually empty

        renderUI();
        showToast(\`Harvested \${crop.name}! +💰\${yieldMoney}\`);
        
        // Win Condition
        if (state.money > 500 && state.eco >= 100) {
            showInfo("Certified Sustainable! 🏆", "You have balanced economics and ecology perfectly using IPM and Crop Rotation. You are a Master of Agriculture!");
        }
    }

    // --- IPM Logic ---
    function resolvePest(method) {
        const idx = state.activePestPlotIndex;
        if (idx === null || !state.plots[idx]) return;

        if (method === 'chemical') {
            if (state.money < 5) return showToast("Need 5 Money");
            state.money -= 5;
            state.soil = Math.max(0, state.soil - 10); // Chemicals hurt soil biology
            state.eco = Math.max(0, state.eco - 5);
            state.plots[idx].hasPest = false;
            showToast("Pesticide used. Pests dead, but soil harmed.");
        } else if (method === 'bio') {
            if (state.money < 25) return showToast("Need 25 Money");
            state.money -= 25;
            state.eco = Math.min(100, state.eco + 5);
            state.plots[idx].hasPest = false;
            showToast("Ladybugs released! Pests eaten naturally.");
        }
        
        closeModal('ipmModal');
        state.activePestPlotIndex = null;
        renderUI();
    }

    // --- Actions ---
    function buyUpgrade(type) {
        if (state.upgrades[type]) return showToast("Already owned.");
        if (type === 'rainwater' && state.money >= 150) {
            state.money -= 150; state.upgrades.rainwater = true;
            showInfo("Water Conservation", "Rainwater harvesting reduces reliance on groundwater.");
        } else if (type === 'bees' && state.money >= 200) {
            state.money -= 200; state.upgrades.bees = true;
            showInfo("Pollination Services", "Bees increase fruit set and quality. Protect them!");
        } else {
            return showToast("Not enough money.");
        }
        renderUI();
    }

    function performAction(type) {
        if (type === 'compost') {
            if (state.money >= 15 && state.soil < 100) {
                state.money -= 15;
                state.soil = Math.min(100, state.soil + 20);
                showToast("Compost added. Soil N increased.");
            } else {
                showToast("Cannot compost (Low money or Soil full)");
            }
        }
        renderUI();
    }

    // --- Rendering ---
    function renderUI() {
        updateHUD();
        renderSeeds();
        
        const grid = document.getElementById('farmGrid');
        grid.innerHTML = '';
        
        state.plots.forEach((plot, idx) => {
            const div = document.createElement('div');
            div.className = 'plot';
            if (state.soil < 20) div.classList.add('dry');
            if (plot && plot.hasPest) div.classList.add('pest-infested');
            div.onclick = () => handlePlot(idx);

            // Check history for rotation warning visuals on empty plots? 
            // Only if selected seed matches history. Too complex visually, skip.

            if (plot) {
                const crop = CROPS.find(c => c.id === plot.cropId);
                let html = '';
                
                // Pest Icon
                if (plot.hasPest) html += '<div class="pest-icon">🐛</div>';
                
                // Rotation Warning Icon
                if (plot.isMonoculture) html += '<div class="rotation-warning">📉</div>';

                // Plant
                if (plot.ready) {
                    html += \`<div class="plant" style="animation: popIn 0.5s infinite alternate">\${crop.emoji}</div>\`;
                    html += \`<div class="soil-label">Ready!</div>\`;
                } else {
                    html += \`<div class="plant" style="font-size: 2em; opacity: 0.7">🌱</div>\`;
                    html += \`<div class="progress-bar" id="prog-\${idx}"></div>\`;
                }
                div.innerHTML = html;
            } else {
                div.innerHTML = '<span style="color:rgba(255,255,255,0.5)">Empty</span>';
            }
            grid.appendChild(div);
        });
    }

    function renderSeeds() {
        const container = document.getElementById('seeds');
        container.innerHTML = '';
        CROPS.forEach(c => {
            const div = document.createElement('div');
            div.className = 'card';
            if (c.type === 'legume') div.classList.add('special');
            if (state.selectedSeed === c.id) div.style.border = '2px solid var(--primary)';
            
            div.onclick = () => selectSeed(c.id);
            div.innerHTML = \`
                <div style="font-size:1.8em">\${c.emoji}</div>
                <h4>\${c.name}</h4>
                <div class="meta">\${c.desc}</div>
                <div class="price-tag">Cost: \${c.price} | 💧\${c.water}</div>
            \`;
            container.appendChild(div);
        });
    }

    function updateHUD() {
        document.getElementById('money').innerText = Math.floor(state.money);
        document.getElementById('eco').innerText = Math.floor(state.eco);
        document.getElementById('water').innerText = Math.floor(state.water);
        document.getElementById('soil').innerText = Math.floor(state.soil);
        
        // Dynamic colors
        document.getElementById('soil').style.color = state.soil < 30 ? 'var(--warning)' : 'var(--dark)';
    }

    function updateGridVisuals() {
        // Lightweight update for loop
        state.plots.forEach((p, idx) => {
             const div = document.getElementById('farmGrid').children[idx];
             if(!div) return;
             if(p && p.hasPest) div.classList.add('pest-infested');
             else div.classList.remove('pest-infested');
             
             if(p && p.ready && !div.innerHTML.includes('Ready!')) {
                 renderUI(); // Full re-render when a crop finishes to show final emoji
             }
        });
    }

    // --- Utilities ---
    function switchTab(t) {
        document.querySelectorAll('.panel').forEach(e=>e.classList.remove('active'));
        document.getElementById(t).classList.add('active');
        document.querySelectorAll('.tab-btn').forEach(e=>e.classList.remove('active'));
        event.target.classList.add('active');
    }

    function closeModal(id) { document.getElementById(id).style.display = 'none'; }
    
    function showInfo(title, text) {
        document.getElementById('infoTitle').innerText = title;
        document.getElementById('infoText').innerText = text;
        document.getElementById('infoModal').style.display = 'flex';
    }

    function showToast(msg) {
        const t = document.getElementById('toast');
        t.innerText = msg;
        t.style.opacity = 1;
        setTimeout(() => t.style.opacity = 0, 2500);
    }

    // Hook to patch history logic if plot is null initially
    state.plotHistory = Array(6).fill(null);

    // Initial Render
    renderSeeds();

</script>
</body>
</html>
`;
