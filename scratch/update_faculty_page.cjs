const fs = require('fs');
const path = require('path');

const facultyFilePath = path.join(__dirname, '..', 'src', 'pages', 'FacultyPage.jsx');
let content = fs.readFileSync(facultyFilePath, 'utf8');

const targetOld = `  return (
    <div className="min-h-screen bg-[#f3f7f5] py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        



        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-3">
          {[
            { id: 'radar', label: 'Department Cohort Radar', icon: BarChart3, badge: '142 Scholars' },
            { id: 'review', label: 'Evaluation & Digital Signature', icon: CheckCircle2, badge: \`\${pendingSubmissions.filter(s => s.status.includes('Pending')).length} Pending\` },
            { id: 'author', label: 'Micro-Course Studio', icon: BookOpen, badge: \`\${microCourses.length} Modules\` },
            { id: 'grants', label: 'CCRAS SPARK-4.0 & FDPs', icon: Award, badge: '300+ Grants' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={\`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border \${
                  isActive
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }\`}
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{tab.label}</span>
                <span className={\`text-[10px] font-extrabold px-2 py-0.5 rounded-full \${
                  isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-600'
                }\`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Department Cohort Radar */}
        {activeTab === 'radar' && (
          <ComingSoonView
            onBack={() => {
              if (onNavigate) onNavigate('feed');
              else setActiveTab('author');
            }}
          />
        )}`;

// Normalize newlines in search
const normalizedTarget = targetOld.replace(/\r?\n/g, '\n');
const normalizedContent = content.replace(/\r?\n/g, '\n');

if (!normalizedContent.includes(normalizedTarget)) {
  console.error("Target pattern not found in FacultyPage.jsx!");
  process.exit(1);
}

const replacementContent = `  // Calculate radar polygon points dynamically
  const radarAxes = activeCohortData.vectors;
  const numAxes = radarAxes.length;
  const radarCx = 190;
  const radarCy = 190;
  const radarRadius = 125;

  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = (value / 100) * radarRadius;
    const x = radarCx + r * Math.cos(angle);
    const y = radarCy + r * Math.sin(angle);
    return { x, y };
  };

  const cohortPolygonPoints = radarAxes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.score);
      return \`\${x},\${y}\`;
    })
    .join(' ');

  const benchmarkPolygonPoints = radarAxes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.benchmark);
      return \`\${x},\${y}\`;
    })
    .join(' ');

  return (
    <div className="min-h-screen bg-[#f3f7f5] py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-4 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 max-w-lg">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-xs flex-1">
            <p className="font-extrabold text-emerald-300">Faculty Preceptor Action Executed</p>
            <p className="text-slate-200 mt-0.5 leading-snug font-medium">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Executive Academic Preceptor Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg border-2 border-emerald-400/40 shrink-0">
              {facultyUser.avatar || 'MJ'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {facultyUser.name}
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Senior Academic Preceptor (NCISM Verified)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {facultyUser.role} · {facultyUser.institution}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-mono">
                <span>Faculty ID: <strong className="text-slate-700 font-semibold">{facultyUser.id}</strong></span>
                <span>•</span>
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Preceptor Digital Signature Key Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Preceptor Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            <div className="bg-emerald-50/80 border border-emerald-200/90 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Mentored Scholars</span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-950">{activeCohortData.totalScholars} Enrolled</span>
            </div>
            <div className="bg-blue-50/80 border border-blue-200/90 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-blue-700 block">Dept. Readiness</span>
              <span className="text-lg sm:text-xl font-extrabold text-blue-950">{activeCohortData.departmentReadiness}%</span>
            </div>
            <div className="bg-purple-50/80 border border-purple-200/90 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-purple-700 block">Placement Fast-Track</span>
              <span className="text-lg sm:text-xl font-extrabold text-purple-950">{activeCohortData.q1Count} Nominees</span>
            </div>
            <div className="bg-amber-50/80 border border-amber-200/90 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-700 block">Active Deficits</span>
              <span className="text-lg sm:text-xl font-extrabold text-amber-950">{activeCohortData.deficitsCount} Critical</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-3">
          {[
            { id: 'radar', label: 'Department Cohort Radar & Deficit Analysis', icon: BarChart3, badge: \`\${activeCohortData.totalScholars} Scholars\` },
            { id: 'review', label: 'Evaluation & Digital Signature', icon: CheckCircle2, badge: \`\${pendingSubmissions.filter(s => s.status.includes('Pending')).length} Pending\` },
            { id: 'author', label: 'Micro-Course Studio', icon: BookOpen, badge: \`\${microCourses.length} Modules\` },
            { id: 'grants', label: 'CCRAS SPARK-4.0 & FDPs', icon: Award, badge: '300+ Grants' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={\`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border \${
                  isActive
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm ring-2 ring-emerald-600/30'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }\`}
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{tab.label}</span>
                <span className={\`text-[10px] font-extrabold px-2 py-0.5 rounded-full \${
                  isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-600'
                }\`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Department Cohort Radar & Deficit Analysis */}
        {activeTab === 'radar' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Cohort Selector & Diagnostic Summary Bar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Department Cohort Diagnostic Suite
                </span>
                <h2 className="text-xl font-black text-slate-900">
                  {activeCohortData.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Aggregate diagnostic performance across 6 audited competency vectors vs National AYUSH Benchmark.
                </p>
              </div>

              {/* Cohort Switcher Buttons */}
              <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
                {Object.values(COHORTS_DATA).map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCohort(c.id)}
                    className={\`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer \${
                      selectedCohort === c.id
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }\`}
                  >
                    {c.shortName}
                  </button>
                ))}
              </div>
            </div>

            {/* Radar Chart & Competency Vectors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Interactive 6-Axis Visual Radar Chart (5 Cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col items-center justify-between space-y-6">
                <div className="w-full text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-700" />
                      <span>Competency Radar Matrix</span>
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      6 Diagnostic Axes
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Normalized 100-point multi-vector diagnostic comparison.
                  </p>
                </div>

                {/* SVG Visual Radar Canvas */}
                <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                  <svg viewBox="0 0 380 380" className="w-full h-full overflow-visible">
                    {/* Concentric Grid Hexagons (20%, 40%, 60%, 80%, 100%) */}
                    {[20, 40, 60, 80, 100].map(level => {
                      const levelPoints = radarAxes.map((_, i) => {
                        const { x, y } = getCoordinates(i, level);
                        return \`\${x},\${y}\`;
                      }).join(' ');

                      return (
                        <polygon
                          key={level}
                          points={levelPoints}
                          fill={level === 100 ? '#f8fafc' : 'none'}
                          stroke="#cbd5e1"
                          strokeWidth="1"
                          strokeDasharray={level === 100 ? 'none' : '3,3'}
                        />
                      );
                    })}

                    {/* Radial Axis Spokes & Endpoint Labels */}
                    {radarAxes.map((axis, i) => {
                      const { x, y } = getCoordinates(i, 100);
                      const labelCoords = getCoordinates(i, 120);
                      const isHovered = hoveredVector === axis.name;

                      return (
                        <g key={i}>
                          <line
                            x1={radarCx}
                            y1={radarCy}
                            x2={x}
                            y2={y}
                            stroke="#94a3b8"
                            strokeWidth="1.2"
                          />
                          <text
                            x={labelCoords.x}
                            y={labelCoords.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className={\`text-[9.5px] font-extrabold transition-all cursor-pointer select-none \${
                              isHovered ? 'fill-emerald-800 font-black text-[10.5px]' : 'fill-slate-600'
                            }\`}
                            onMouseEnter={() => setHoveredVector(axis.name)}
                            onMouseLeave={() => setHoveredVector(null)}
                          >
                            {axis.name.split(' ')[0]} ({axis.score}%)
                          </text>
                        </g>
                      );
                    })}

                    {/* National AYUSH Benchmark Polygon (Dashed Slate) */}
                    <polygon
                      points={benchmarkPolygonPoints}
                      fill="rgba(148, 163, 184, 0.12)"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeDasharray="5,4"
                    />

                    {/* Benchmark Dots */}
                    {radarAxes.map((axis, i) => {
                      const { x, y } = getCoordinates(i, axis.benchmark);
                      return (
                        <circle
                          key={\`bench-\${i}\`}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="#64748b"
                        />
                      );
                    })}

                    {/* Cohort Diagnostic Polygon (Emerald Glowing Stroke & Translucent Fill) */}
                    <polygon
                      points={cohortPolygonPoints}
                      fill="rgba(16, 185, 129, 0.25)"
                      stroke="#059669"
                      strokeWidth="2.5"
                    />

                    {/* Cohort Interactive Vertices */}
                    {radarAxes.map((axis, i) => {
                      const { x, y } = getCoordinates(i, axis.score);
                      const isHovered = hoveredVector === axis.name;

                      return (
                        <g 
                          key={\`cohort-\${i}\`}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredVector(axis.name)}
                          onMouseLeave={() => setHoveredVector(null)}
                        >
                          <circle
                            cx={x}
                            cy={y}
                            r={isHovered ? 7 : 5}
                            fill="#059669"
                            stroke="#ffffff"
                            strokeWidth="2"
                            className="transition-all duration-200"
                          />
                          {isHovered && (
                            <circle
                              cx={x}
                              cy={y}
                              r="11"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="1.5"
                              className="animate-ping"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Tooltip Overlay on Vector Hover */}
                  {hoveredVector && (
                    <div className="absolute top-2 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xl pointer-events-none z-20 border border-emerald-500">
                      {hoveredVector}: {radarAxes.find(a => a.name === hoveredVector)?.score}% (Natl: {radarAxes.find(a => a.name === hoveredVector)?.benchmark}%)
                    </div>
                  )}
                </div>

                {/* Radar Chart Legend */}
                <div className="w-full flex items-center justify-center gap-6 pt-2 border-t border-slate-100 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 border border-emerald-700" />
                    <span className="text-slate-800">Cohort Score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-0.5 border-b-2 border-dashed border-slate-500" />
                    <span className="text-slate-500">National AYUSH Benchmark</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Audited Competency Vectors & Deficit Breakdown (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        Audited Competency Vector Breakdown ({radarAxes.length} Axes)
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Real-time student diagnostic assessment data logged under HOD supervision.
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Cohort Avg: {activeCohortData.departmentReadiness}%
                    </span>
                  </div>

                  {/* Vector Cards List */}
                  <div className="space-y-3 pt-1">
                    {radarAxes.map((vec, idx) => {
                      const isDeficit = vec.delta < 0;
                      const isHovered = hoveredVector === vec.name;

                      return (
                        <div 
                          key={idx}
                          onMouseEnter={() => setHoveredVector(vec.name)}
                          onMouseLeave={() => setHoveredVector(null)}
                          className={\`p-4 rounded-2xl border transition-all cursor-pointer \${
                            isHovered
                              ? 'border-emerald-500 bg-emerald-50/40 shadow-sm'
                              : isDeficit
                              ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                              : 'bg-slate-50 border-slate-200/80 hover:border-emerald-300'
                          }\`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-900 text-sm">{vec.name}</span>
                              <span className={\`text-[10px] font-extrabold px-2 py-0.5 rounded-md \${
                                isDeficit
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              }\`}>
                                {vec.status}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="font-black text-slate-900 text-sm">{vec.score}%</span>
                              <span className="text-slate-500 text-[11px] font-medium ml-1.5">
                                (Natl: {vec.benchmark}%)
                              </span>
                            </div>
                          </div>

                          {/* Progress Dual Bar */}
                          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden relative">
                            {/* National Benchmark Marker */}
                            <div
                              className="absolute top-0 bottom-0 w-1 bg-slate-600 z-10"
                              style={{ left: \`\${vec.benchmark}%\` }}
                              title={\`National Benchmark: \${vec.benchmark}%\`}
                            />
                            {/* Cohort Progress Fill */}
                            <div
                              className={\`h-full rounded-full transition-all duration-500 \${
                                isDeficit ? 'bg-amber-500' : 'bg-emerald-600'
                              }\`}
                              style={{ width: \`\${vec.score}%\` }}
                            />
                          </div>

                          <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                            <span>{vec.desc}</span>
                            <span className={\`font-bold \${isDeficit ? 'text-amber-800' : 'text-emerald-700'}\`}>
                              Delta: {vec.delta > 0 ? \`+\${vec.delta}%\` : \`\${vec.delta}%\`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 1-Click Pedagogical Interventions Desk */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">
                      1-Click Pedagogical Interventions Desk
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200">
                      Curriculum Bridge Sprints
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Deploy targeted micro-sprints to close identified cohort deficits before upcoming campus placement drives.
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 shrink-0">
                  Target Cohort: {activeCohortData.shortName}
                </span>
              </div>

              {/* Interventions Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {interventions.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                          {item.format}
                        </span>
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {item.duration}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.impact}
                      </p>

                      <div className="pt-1">
                        <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block">
                          Addresses: {item.deficitsAddressed.join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80">
                      <button
                        onClick={() => handleDeployIntervention(item.id)}
                        disabled={item.isDeployed}
                        className={\`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 \${
                          item.isDeployed
                            ? 'bg-emerald-100 text-emerald-900 cursor-default border border-emerald-300'
                            : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-md active:scale-95'
                        }\`}
                      >
                        {item.isDeployed ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>Deployed &amp; Active ({item.deployedCount} Enrolled)</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-emerald-300" />
                            <span>Deploy to Cohort (1-Click)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quartile Readiness Distribution & Placement Nomination Desk */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Student Readiness Quartiles (4 Cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
                <h3 className="text-base font-black text-slate-900">
                  Readiness Quartile Distribution
                </h3>
                <p className="text-xs text-slate-500">
                  Scholars segmented by verified practical diagnostic scores.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-emerald-900 block font-bold">Q1: Day-1 Ready (85%+)</strong>
                      <span className="text-[11px] text-emerald-700">Immediate industry placement</span>
                    </div>
                    <span className="text-base font-black text-emerald-950">58 (41%)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-blue-900 block font-bold">Q2: Near Benchmark (75–84%)</strong>
                      <span className="text-[11px] text-blue-700">Needs 1 bridge simulator</span>
                    </div>
                    <span className="text-base font-black text-blue-950">49 (35%)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-amber-900 block font-bold">Q3: Targeted Mentorship (65–74%)</strong>
                      <span className="text-[11px] text-amber-700">Faculty lab hours required</span>
                    </div>
                    <span className="text-base font-black text-amber-950">26 (18%)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-slate-800 block font-bold">Q4: Remedial Track (&lt;65%)</strong>
                      <span className="text-[11px] text-slate-600">Mandatory foundation sprint</span>
                    </div>
                    <span className="text-base font-black text-slate-900">9 (6%)</span>
                  </div>
                </div>
              </div>

              {/* Direct Industry Placement Nominee Desk (8 Cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Fast-Track Industry Placement Nominee Desk
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Endorse top scholars directly to corporate R&amp;D partners (Dabur, Patanjali, Himalaya, Charak).
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-purple-50 text-purple-900 font-bold text-xs rounded-full border border-purple-200">
                    Preceptor Endorsements
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  {placementNominees.map((nom) => (
                    <div 
                      key={nom.id}
                      className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{nom.studentName}</h4>
                          <span className="text-xs text-slate-500">({nom.degree})</span>
                          <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                            {nom.hash}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                          <span>Target: <strong className="text-slate-800">{nom.targetCompany}</strong></span>
                          <span>•</span>
                          <span>Role: <strong className="text-slate-800">{nom.recommendedRole}</strong></span>
                          <span>•</span>
                          <span className="text-emerald-800 font-bold">{nom.topSkill}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-black text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                          {nom.readiness}% Score
                        </span>

                        <button
                          onClick={() => handleNominateStudent(nom)}
                          disabled={nom.isNominated}
                          className={\`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 \${
                            nom.isNominated
                              ? 'bg-emerald-100 text-emerald-900 cursor-default border border-emerald-300'
                              : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs'
                          }\`}
                        >
                          {nom.isNominated ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Endorsed &amp; Sent</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 text-emerald-300" />
                              <span>Endorse Nominee</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}`;

const updatedContent = normalizedContent.replace(normalizedTarget, replacementContent);
fs.writeFileSync(facultyFilePath, updatedContent, 'utf8');
console.log("FacultyPage.jsx successfully updated with full Department Cohort Radar & Deficit Analysis suite!");
