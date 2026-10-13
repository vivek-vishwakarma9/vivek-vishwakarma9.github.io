/**
 * Vivek Vishwakarma | Executive DevSecOps & AI Cloud Portfolio Scripts
 * Interactive CLI, Pipeline Inspector, Typewriter & UX Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCustomCursor();
  initVanillaTilt();
  initK8sClusterRadar();
  initLiveGitHubStats();
  initTypewriter();
  initPipelineInspector();
  initCloudTerminal();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Navbar & Mobile Menu Handling
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriter');
  if (!typewriterEl) return;

  const phrases = [
    'Senior DevSecOps Engineer',
    'End-to-End Cloud Infrastructure Deployment',
    'Zero-Downtime Deployments (Rolling Updates & Blue-Green)',
    'Production Troubleshooting: Pod CrashLoop & Outage Triaging',
    'Disaster Recovery (DR) Specialist: Strict RPO & RTO',
    'Governance Policies: Azure Policy & Terraform IaC (90%)',
    'Kubernetes, ArgoCD GitOps, Helm 3 & Agentic AI',
    'Enterprise Databases: Oracle Database & SQL'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 50;
  const deleteSpeed = 22;
  const delayBetweenPhrases = 2200;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenPhrases);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 350);
      return;
    }

    setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. DevSecOps Interactive Pipeline Visualizer
   -------------------------------------------------------------------------- */
function initPipelineInspector() {
  const stages = document.querySelectorAll('.pipeline-stage');
  const titleEl = document.getElementById('detailTitle');
  const badgeEl = document.getElementById('detailBadge');
  const descEl = document.getElementById('detailDesc');
  const checklistEl = document.getElementById('detailChecklist');

  const stageData = {
    code: {
      title: 'Stage 01: Source Code & Secret Scanning',
      badge: 'Git Hooks Active',
      desc: 'Enforcing pre-commit validations, Git hooks, Gitleaks pattern detection to prevent hardcoded credentials or API keys, and SonarQube static code quality metrics before pull requests can merge.',
      checklist: [
        'Gitleaks & Trufflehog secret prevention',
        'Terraform fmt & validate automated hooks',
        'Strict branch protection & signed commits'
      ]
    },
    sast: {
      title: 'Stage 02: Static Analysis (SAST) & SCA Governance',
      badge: 'Zero-Tolerance Policy',
      desc: 'Automated Checkmarx SAST scanning across microservices and application code. Black Duck Software Composition Analysis (SCA) automatically checks open-source dependencies for known CVEs and license compliance.',
      checklist: [
        'Checkmarx automated security policy gates',
        'Black Duck open-source dependency auditing',
        'Automated pull request blocker on High/Critical CVEs'
      ]
    },
    container: {
      title: 'Stage 03: Container Image Hardening & Registry Scanning',
      badge: 'Distroless & Signed',
      desc: 'Multi-stage Docker builds utilizing minimal Distroless / Alpine base images. Aqua Security and Trivy analyze container layers during build time before pushing images to Azure Container Registry (ACR) or AWS ECR.',
      checklist: [
        'Trivy image vulnerability scanning (CVE database sync)',
        'Aqua Security container compliance verification',
        'Non-root user execution & read-only file systems'
      ]
    },
    iac: {
      title: 'Stage 04: Infrastructure-as-Code (IaC) Guardrails & Governance',
      badge: 'Checkov & Azure Policy Validated',
      desc: 'Terraform code is parsed using Checkov and tfsec to enforce CIS Azure/AWS benchmarks. Azure Policy guarantees zero public IPs on databases, enforces mandatory tags, and mandates encryption-at-rest across storage.',
      checklist: [
        'Checkov static analysis for Terraform templates',
        'Enforce Private Endpoints & NSG default-deny rules',
        'Automated cost estimation & drift detection'
      ]
    },
    deploy: {
      title: 'Stage 05: GitOps & Zero-Downtime Deployment',
      badge: 'Automated ArgoCD / Helm',
      desc: 'Continuous delivery orchestrated through ArgoCD and Helm 3 into Private Azure Kubernetes Service (AKS). Canary, Rolling Updates, and Blue-Green deployments guarantee zero-downtime microservice rollouts.',
      checklist: [
        'ArgoCD GitOps declarative cluster sync',
        'Pod Disruption Budgets & Horizontal Pod Autoscaling (HPA)',
        'Azure Key Vault CSI driver secret injection'
      ]
    },
    monitor: {
      title: 'Stage 06: Full-Stack Observability & Disaster Recovery',
      badge: 'Datadog & DR Synced',
      desc: 'Live runtime protection, real-time observability powered by Datadog APM, Prometheus, and Grafana. Continuous cross-region replication guarantees adherence to strict RPO and RTO SLAs.',
      checklist: [
        'Datadog APM tracing & anomaly detection',
        'Disaster Recovery (RPO < 15m, RTO < 1h)',
        'Oracle & SQL real-time query metrics & alerts'
      ]
    }
  };

  stages.forEach(stage => {
    stage.addEventListener('click', () => {
      stages.forEach(s => s.classList.remove('active'));
      stage.classList.add('active');

      const stageKey = stage.getAttribute('data-stage');
      const data = stageData[stageKey];
      if (data && titleEl && descEl && checklistEl) {
        titleEl.textContent = data.title;
        badgeEl.textContent = data.badge;
        descEl.textContent = data.desc;
        checklistEl.innerHTML = data.checklist
          .map(item => `<span><i class="fa-solid fa-check text-accent"></i> ${item}</span>`)
          .join('');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Cloud Terminal CLI (vsh - Vivek Shell)
   -------------------------------------------------------------------------- */
function initCloudTerminal() {
  const terminalBody = document.getElementById('terminalOutput');
  const terminalInput = document.getElementById('terminalInput');
  const termSendBtn = document.getElementById('termSendBtn');
  const clearBtn = document.getElementById('clearTerminalBtn');
  const cmdChips = document.querySelectorAll('.cmd-chip');

  if (!terminalBody || !terminalInput) return;

  const commands = {
    help: () => [
      '<span class="text-cyan">Available commands:</span>',
      '  <span class="text-accent">skills</span>           - View breakdown of tech skills & percentages',
      '  <span class="text-accent">troubleshoot</span>     - Simulate production issue triage (Pod crash / 502 / OOM)',
      '  <span class="text-accent">dr-status</span>        - Check Disaster Recovery metrics & RPO/RTO SLAs',
      '  <span class="text-accent">ai-agent</span>         - Run Agentic AI cloud autonomous triage scan',
      '  <span class="text-accent">infra-status</span>     - Check multi-cloud cluster & landing zone status',
      '  <span class="text-accent">terraform plan</span>   - Run simulated Terraform IaC execution plan',
      '  <span class="text-accent">kubectl get pods</span> - View active production microservice pods',
      '  <span class="text-accent">contact</span>          - View Vivek\'s direct contact channels',
      '  <span class="text-accent">clear</span>            - Clear terminal output screen'
    ],
    troubleshoot: () => [
      '<span class="text-cyan">=== Production Incident Triage Simulation ===</span>',
      '<span class="text-rose">✖ High Severity Alert:</span> payment-service Pod in CrashLoopBackOff & HTTP 502 Bad Gateway',
      '<span class="text-yellow">[Step 1: Log Inspection]</span> `kubectl logs --previous`: java.lang.OutOfMemoryError (OOMKilled exit code 137)',
      '<span class="text-yellow">[Step 2: Ingress & Network]</span> Health probes failing due to memory freeze; traffic unroutable',
      '<span class="text-cyan">[Step 3: Rapid Remediation]</span> Patch deployment: Memory limit 512Mi -> 1024Mi; tuned initialDelaySeconds',
      '<span class="text-green">✔ Rolling deployment executed with ZERO DOWNTIME.</span>',
      '<span class="text-green">✔ All 3/3 replicas running healthy (100% traffic restored in &lt; 8 minutes).</span>'
    ],
    'dr-status': () => [
      '<span class="text-cyan">=== Enterprise Disaster Recovery (DR) Posture ===</span>',
      '  📍 Primary Site     : Azure East US (Active AKS + Hub-Spoke VNet + DB)',
      '  📍 Secondary (DR)   : Azure Central US (Warm Standby / Geo-Replicated)',
      '  ⏱️ RPO (Recovery Point) : &lt; 15 Minutes | <span class="text-green">Achieved: 3.5 Minutes (Continuous Sync)</span>',
      '  ⏱️ RTO (Recovery Time)  : &lt; 60 Minutes | <span class="text-green">Achieved: 18.2 Minutes (Automated Failover)</span>',
      '  🛡️ Velero K8s Snapshots : Verified 100% successful daily backups',
      '<span class="text-green">✔ Business Continuity Status: Fully Compliant with Zero-Data-Loss Standards</span>'
    ],
    skills: () => [
      '<span class="text-cyan">=== Technical Competencies & Language Ratio ===</span>',
      '  [IaC]        Terraform / HCL         : 90% [==================--]',
      '  [Configs]    YAML (Pipelines/K8s)    : 90% [==================--]',
      '  [Scripting]  Linux Shell / Bash       : 70% [==============------]',
      '  [Scripting]  PowerShell Automation   : 65% [=============-------]',
      '  [Code]       Python & AI Automation  : 60% [============--------]',
      '  [Cloud]      Microsoft Azure (AKS)   : 92% [==================--]',
      '  [Cloud]      Amazon Web Services AWS : 85% [=================---]',
      '  [GitOps]     ArgoCD & Helm 3 Charts  : 88% [=================---]',
      '  [CI/CD]      GitHub Actions & Azure  : 90% [==================--]',
      '  [Security]   Checkmarx, Trivy, Aqua  : 88% [=================---]',
      '  [AI Ops]     Agentic AI Autonomous   : 82% [================----]',
      '  [Database]   Oracle Database & SQL   : 85% [=================---]',
      '  [Telemetry]  Datadog APM, Prometheus : 86% [=================---]'
    ],
    'ai-agent': () => [
      '<span class="text-muted">$ vivek-agentic-ai --cluster-audit --self-heal</span>',
      '<span class="text-purple">[Agentic AI Engine]</span> Initializing autonomous reasoning loop...',
      '<span class="text-purple">[Agentic AI Engine]</span> Correlating Datadog telemetry + Kubernetes API events...',
      '<span class="text-green">✔ AKS Pod Health: 100% nominal (Zero restart loops).</span>',
      '<span class="text-green">✔ Oracle & SQL Latency: &lt; 2.4ms (Cache hit ratio: 99.4%).</span>',
      '<span class="text-green">✔ Cost Optimization Agent: Reclaimed $420/month on idle compute.</span>',
      '<span class="text-cyan">Autonomous Triaging Complete: 0 interventions required.</span>'
    ],
    'infra-status': () => [
      '<span class="text-green">✔ Azure Virtual Network Hub-Spoke:</span> ONLINE (VNet-Hub &lt;--&gt; VNet-Spoke Peered)',
      '<span class="text-green">✔ Azure Kubernetes Service (AKS):</span> CLUSTER HEALTHY (Nodes: 3/3 Ready, Private API)',
      '<span class="text-green">✔ GitOps Engine (ArgoCD & Helm):</span> SYNCHRONIZED (All manifests up-to-date)',
      '<span class="text-green">✔ Point-to-Site VPN Gateway:</span> ACTIVE (OpenVPN / Azure Certificate Auth)',
      '<span class="text-green">✔ Oracle Database & SQL Cluster:</span> CONNECTED (Private Endpoint 10.0.3.4)',
      '<span class="text-green">✔ Key Vault RBAC Secrets:</span> SYNCHRONIZED (Zero public endpoints)',
      '<span class="text-green">✔ Datadog DaemonSet Agents:</span> REPORTING (100% metrics ingested)',
      '<span class="text-cyan">Overall Health: 100% OPTIMAL (Zero Vulnerabilities Detected)</span>'
    ],
    'terraform plan': () => [
      '<span class="text-muted">$ terraform plan -out=tfplan</span>',
      'Acquiring state lock. This may take a few moments...',
      'Refreshing Terraform state in memory prior to plan...',
      'module.aks_cluster.azurerm_kubernetes_cluster.k8s: Refreshing state... [id=/subscriptions/...]',
      'module.networking.azurerm_virtual_network.vnet: Refreshing state...',
      '<span class="text-cyan">------------------------------------------------------------------------</span>',
      '<span class="text-green">Plan: 24 to add, 0 to change, 0 to destroy.</span>',
      '<span class="text-muted">Changes to Outputs:</span>',
      '  + aks_cluster_id   = "/subscriptions/.../resourceGroups/rg-infra/providers/Microsoft.ContainerService/managedClusters/aks-prod"',
      '  + private_fqdn     = "aks-prod-priv-aionos.hcp.eastus.azmk8s.io"',
      '<span class="text-green">✔ Zero-Trust IaC Policy Checks Passed (Checkov 0 failed). Ready to apply!</span>'
    ],
    'kubectl get pods': () => [
      '<span class="text-muted">$ kubectl get pods -n production -o wide</span>',
      'NAME                             READY   STATUS    RESTARTS   AGE    IP            NODE',
      '<span class="text-green">auth-service-7f89d4cb8-x29q1</span>     1/1     Running   0          4d2h   10.244.0.12   aks-agentpool-vmss000',
      '<span class="text-green">argocd-server-84f9bc-4kl12</span>       1/1     Running   0          18d    10.244.0.15   aks-agentpool-vmss001',
      '<span class="text-green">payment-gateway-69d4cb8-l91zp</span>    1/1     Running   0          4d2h   10.244.0.18   aks-agentpool-vmss001',
      '<span class="text-green">data-processor-58471c-klm20</span>     1/1     Running   0          1d8h   10.244.0.22   aks-agentpool-vmss002',
      '<span class="text-green">datadog-agent-daemonset-4gq9p</span>   1/1     Running   0          14d    10.244.0.2    aks-agentpool-vmss000',
      '<span class="text-cyan">Total: 5 Pods Running, 0 Crashing, 0 Pending.</span>'
    ],
    contact: () => [
      '<span class="text-cyan">=== Vivek Vishwakarma Contact Details ===</span>',
      '  👤 Name     : Vivek Vishwakarma',
      '  💼 Title    : Senior DevSecOps Engineer | Azure & AWS | Agentic AI',
      '  📱 Phone    : <a href="tel:+918999617471" class="text-accent">+91 8999617471</a>',
      '  📧 Email    : <a href="mailto:vivekvis321@gmail.com" class="text-accent">vivekvis321@gmail.com</a>',
      '  🔗 LinkedIn : <a href="https://www.linkedin.com/in/vivek-vishwakarmaa/" target="_blank" rel="noopener noreferrer" class="text-accent">linkedin.com/in/vivek-vishwakarmaa</a>',
      '  🐙 GitHub   : <a href="https://github.com/vivek-vishwakarma9" target="_blank" class="text-accent">github.com/vivek-vishwakarma9</a>'
    ],
    clear: () => {
      terminalBody.innerHTML = '';
      return [];
    }
  };

  function executeCommand(inputRaw) {
    const input = inputRaw.trim().toLowerCase();
    if (!input) return;

    // Append user input line
    const userLine = document.createElement('div');
    userLine.className = 'term-line';
    userLine.innerHTML = `<span class="term-prompt">vivek@devsecops-cloud:~$</span> <span class="text-white">${escapeHtml(inputRaw)}</span>`;
    terminalBody.appendChild(userLine);

    if (commands[input]) {
      const outputLines = commands[input]();
      outputLines.forEach(line => {
        const lineEl = document.createElement('div');
        lineEl.className = 'term-line';
        lineEl.innerHTML = line;
        terminalBody.appendChild(lineEl);
      });
    } else {
      const errEl = document.createElement('div');
      errEl.className = 'term-line';
      errEl.innerHTML = `<span class="text-rose">vsh: command not found: ${escapeHtml(input)}. Type <span class="text-accent">help</span> for available commands.</span>`;
      terminalBody.appendChild(errEl);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
    terminalInput.value = '';
  }

  // Global helper for button clicks in project cards
  window.runCommandInTerminal = (cmd) => {
    const termSec = document.getElementById('terminal');
    if (termSec) {
      termSec.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      executeCommand(cmd);
    }, 500);
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    }
  });

  if (termSendBtn) {
    termSendBtn.addEventListener('click', () => {
      executeCommand(terminalInput.value);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      commands.clear();
    });
  }

  cmdChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* --------------------------------------------------------------------------
   5. Contact Form Handler
   -------------------------------------------------------------------------- */
window.handleContactSubmit = function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('formSubmitBtn');

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Transmission...';

  setTimeout(() => {
    statusEl.innerHTML = `
      <span class="text-green">
        <i class="fa-solid fa-circle-check"></i> Thank you, ${escapeHtml(name)}! Opening your email app to reach Vivek directly at vivekvis321@gmail.com...
      </span>
    `;

    // Construct mailto link
    const mailtoUrl = `mailto:vivekvis321@gmail.com?subject=${encodeURIComponent(`[DevSecOps Inquiry] ${subject} from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInquiry Type: ${subject}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoUrl;

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Ready';
  }, 900);
};

/* --------------------------------------------------------------------------
   6. Scroll Animations & Reveal
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.glass-panel, .metric-card').forEach(el => {
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   7. Magnetic Neon Glow Cursor (Desktop only)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const interactiveSelector = 'a, button, .cockpit-btn, .pipeline-stage, .cmd-chip, .profile-badge-pill, .glass-panel, .orbit-satellite';
  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });
}

/* --------------------------------------------------------------------------
   8. 3D Card Tilt (VanillaTilt)
   -------------------------------------------------------------------------- */
function initVanillaTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  if (!window.matchMedia('(hover: hover)').matches) return;

  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 10,
    speed: 500,
    glare: true,
    'max-glare': 0.22,
    scale: 1.01
  });
}

/* --------------------------------------------------------------------------
   9. Autonomous Kubernetes & Agentic AI Cluster Radar Simulator
   -------------------------------------------------------------------------- */
function initK8sClusterRadar() {
  const btnBlueGreen = document.getElementById('btnSimulateBlueGreen');
  const btnSelfHeal = document.getElementById('btnSimulateSelfHeal');
  const btnTrivy = document.getElementById('btnSimulateTrivyScan');
  const logStream = document.getElementById('radarLogStream');
  const k8sCore = document.getElementById('k8sCoreSphere');
  const satArgo = document.getElementById('satArgo');
  const satAi = document.getElementById('satAi');
  const satTrivy = document.getElementById('satTrivy');

  function addLog(msg, colorClass = 'text-cyan') {
    if (!logStream) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const line = document.createElement('div');
    line.className = 'log-line text-muted';
    line.innerHTML = `[${timeStr}] <span class="${colorClass}">${msg}</span>`;
    logStream.appendChild(line);
    logStream.scrollTop = logStream.scrollHeight;
  }

  // 1. Blue-Green Zero-Downtime Deployment
  if (btnBlueGreen) {
    btnBlueGreen.addEventListener('click', () => {
      btnBlueGreen.disabled = true;
      addLog('ArgoCD: Initiating Zero-Downtime Blue-Green traffic shift...', 'text-yellow');
      if (satArgo) satArgo.style.transform = 'translate(-50%, -50%) scale(1.35)';

      setTimeout(() => {
        addLog('Ingress Controller: Routing 100% traffic from Blue (v1.4) &rarr; Green (v1.5)', 'text-cyan');
        if (k8sCore) {
          k8sCore.style.boxShadow = '0 0 50px rgba(16, 185, 129, 0.7)';
          k8sCore.style.borderColor = '#10b981';
        }
      }, 700);

      setTimeout(() => {
        addLog('Zero-Downtime Verification: 0 dropped packets | P99 latency: 3.4ms | Complete!', 'text-green');
        if (satArgo) satArgo.style.transform = '';
        if (k8sCore) {
          k8sCore.style.boxShadow = '';
          k8sCore.style.borderColor = '';
        }
        btnBlueGreen.disabled = false;
      }, 1600);
    });
  }

  // 2. AI Pod Self-Healing Simulation
  if (btnSelfHeal) {
    btnSelfHeal.addEventListener('click', () => {
      btnSelfHeal.disabled = true;
      addLog('SIMULATION: Injected CrashLoopBackOff on pod `checkout-service-8b1`', 'text-rose');
      if (satAi) satAi.style.transform = 'translate(-50%, -50%) scale(1.35)';

      setTimeout(() => {
        addLog('Agentic AI Operator: Intercepted crash event. Diagnosing OOMKill exit code 137...', 'text-purple');
      }, 600);

      setTimeout(() => {
        addLog('Agentic AI: Auto-remediation applied: memory limit 512Mi &rarr; 1024Mi. Pod healthy!', 'text-green');
        if (satAi) satAi.style.transform = '';
        btnSelfHeal.disabled = false;
      }, 1500);
    });
  }

  // 3. Trivy Security Audit
  if (btnTrivy) {
    btnTrivy.addEventListener('click', () => {
      btnTrivy.disabled = true;
      addLog('Trivy Engine: Scanning image `acr.azure.io/microservices/api:v3`...', 'text-yellow');
      if (satTrivy) satTrivy.style.transform = 'translate(-50%, -50%) scale(1.35)';

      setTimeout(() => {
        addLog('CVE Database Sync: 0 Critical, 0 High vulnerabilities detected in Distroless layers', 'text-cyan');
      }, 700);

      setTimeout(() => {
        addLog('Admission Controller: Policy Gate Approved & Signed &rarr; Permitted to deploy', 'text-green');
        if (satTrivy) satTrivy.style.transform = '';
        btnTrivy.disabled = false;
      }, 1500);
    });
  }
}

/* --------------------------------------------------------------------------
   10. Live GitHub API Data Sync
   -------------------------------------------------------------------------- */
function initLiveGitHubStats() {
  const username = 'vivek-vishwakarma9';
  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) throw new Error('Rate limit');
      return res.json();
    })
    .then(data => {
      const repoEl = document.getElementById('githubRepoCount');
      if (repoEl && data.public_repos) {
        repoEl.textContent = `${data.public_repos}+`;
      }
    })
    .catch(() => {
      // Graceful offline fallback
    });
}
