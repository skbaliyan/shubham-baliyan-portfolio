import type { Project } from '@/types'

/* ============================================================
   PROJECT ARCHIVE
   Add a project by appending one object. The grid, the case
   study template and the prev/next navigation all read from here.

   AUTHENTICITY (section 24): every `status: 'placeholder'` block
   renders a visible PLACEHOLDER marker on the page. No metric
   appears here that was not stated by Shubham. Where a project
   has no measured result, `outcome.kind` is 'qualitative' and
   says so in plain language.
   ============================================================ */

export const projects: Project[] = [
  /* ---------------------------------------------------------- 01 */
  {
    slug: 'techxcelerate-os',
    number: '01',
    title: 'TechXcelerate OS',
    category: 'Recruiting Operating System',
    description:
      'AI-powered operating system for modern technical recruiting, talent intelligence, automation, and recruitment workflows.',
    year: '2026',
    status: 'IN BUILD',
    technologies: ['GPT-4o', 'Claude', 'Prompt Engineering', 'React', 'Automation', 'APIs'],
    thumbnail: 'os',
    contentStatus: 'documented',
    tagline: 'Screening that separates what is legal from what is good.',
    overview: [
      'TechXcelerate OS is the umbrella for the recruiting tools I build for my own desk and for teams running US IT staffing. It is not one app. It is a set of parts that share one opinion about how screening should work.',
      'The core part is HireOS, a two-stage screening engine built on a Gate to Fit to Submit model. Eligibility is hard-gated before anything is scored. Fit ranking runs only on the candidates who are actually submittable, across ten technical and functional role profiles.',
      'Around it sit the shipped tools: The Juicer, a live LinkedIn profile auditor, and Candidate Pool Finder, which turns a job description into platform search links and Google X-Ray Boolean strings.',
    ],
    problem: [
      'Most screening produces a single blended score. Skill match, years of experience, work authorization, rate expectation and submission history all collapse into one number.',
      'That merge has two costs. A candidate who cannot legally be submitted still ranks well, so a recruiter finds out at the worst possible moment. And a candidate with an employment gap gets marked down on a factor that has nothing to do with whether they can do the job.',
      'The result is that recruiters re-verify everything by hand anyway. The score saves no time because it cannot be trusted on its own.',
    ],
    context: [
      {
        label: 'Built for',
        body: 'My own recruiting desk first, then US IT staffing teams running W2 and C2C hiring at volume.',
      },
      {
        label: 'Operating environment',
        body: 'VMS-driven delivery (Fieldglass, Beeline, IQNavigator) and ATS-driven records (Job Diva, Ceipal), where compliance and documentation are not optional.',
      },
      {
        label: 'Constraint',
        body: 'A recruiter has to explain a rejection to a candidate and a shortlist to a hiring manager. Anything unexplainable is unusable.',
      },
    ],
    approach: [
      {
        label: 'Split the decision in two',
        body: 'Eligibility is a boolean question, not a weight. Work authorization, rate ceiling, right-to-represent and duplicate submission are gates. They run first, in deterministic code, not in a model.',
      },
      {
        label: 'Score only the eligible',
        body: 'Fit scoring never sees a candidate who failed a gate. That keeps the ranking honest: everything in the ranked list is genuinely submittable.',
      },
      {
        label: 'Remove the factors that were never signal',
        body: 'Employment gaps and compliance facts are excluded from fit ranking outright. A gap is a conversation, not a penalty.',
      },
      {
        label: 'Make Submit a separate act',
        body: 'The system prepares a submission packet. A person sends it. There is no path where the tool submits on its own.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Role profiles',
        body: 'Ten technical and functional roles defined as explicit profiles: the skills that count, the ones that are nice to have, and the ones recruiters habitually over-weight.',
      },
      {
        step: '02',
        title: 'Gate rules',
        body: 'Each gate written as a hard rule with a stated reason string, so a failed gate always returns why it failed rather than a silent drop.',
      },
      {
        step: '03',
        title: 'Fit rubric',
        body: 'A fixed rubric per role. The model scores against named criteria and returns a rationale for each one, not a bare number.',
      },
      {
        step: '04',
        title: 'Submit packet',
        body: 'The structured summary a recruiter actually sends, with evidence pulled from the resume and mapped to the requirement it satisfies.',
      },
      {
        step: '05',
        title: 'Tools around the core',
        body: 'The Juicer and Candidate Pool Finder shipped as standalone tools, feeding the same model of what makes a candidate submittable.',
      },
    ],
    aiLayer: {
      status: 'documented',
      body:
        'The models read and structure. They do not decide eligibility. Every gate is ordinary deterministic code, because a compliance decision a model can hallucinate is not a compliance decision.',
      stack: ['GPT-4o', 'Claude', 'Prompt Engineering', 'Structured Output', 'APIs'],
      uses: [
        {
          label: 'JD parsing',
          body: 'Turn an unstructured job description into named requirements, seniority signals and the implicit must-haves the JD never spells out.',
        },
        {
          label: 'Resume structuring',
          body: 'Extract roles, dates, stack and evidence into a shape the rubric can score against.',
        },
        {
          label: 'Fit rationale',
          body: 'Score each rubric criterion and return the sentence that justifies it, so the recruiter can defend the shortlist.',
        },
        {
          label: 'Prompt design',
          body: 'Prompts constrained to structured output with a required rationale field. The rationale is what makes the score auditable.',
        },
      ],
    },
    architecture: {
      status: 'documented',
      summary:
        'A one-way pipeline. Each stage can only reduce or annotate the set it receives. No stage can promote a candidate the previous stage rejected.',
      nodes: [
        {
          id: 'INTAKE',
          label: 'Intake',
          detail: 'JD and candidate records parsed into structured requirement and evidence objects.',
        },
        {
          id: 'GATE',
          label: 'Gate',
          detail:
            'Deterministic eligibility: work authorization, rate ceiling, RTR, duplicate submission. Pass or fail, with a reason.',
        },
        {
          id: 'FIT',
          label: 'Fit',
          detail:
            'Rubric scoring across ten role profiles. Runs only on the eligible set. Returns a score plus per-criterion rationale.',
        },
        {
          id: 'SUBMIT',
          label: 'Submit',
          detail: 'Structured submission packet assembled for human review. Sending stays a manual act.',
        },
      ],
      notes: [
        'Gates run before scoring, never alongside it.',
        'Compliance facts and employment gaps are excluded from the fit score by construction, not by tuning.',
        'Every rejection carries a reason string back to the recruiter.',
        'No stage writes to the ATS on its own.',
      ],
    },
    build: [
      {
        kind: 'decision',
        title: 'Why gates are code and not prompts',
        caption:
          'The first version asked the model to consider work authorization as one factor among many. It was right most of the time, which is the worst possible outcome for a compliance check. Gates moved into deterministic code and stopped being a probability.',
      },
      {
        kind: 'interface',
        title: 'The Juicer — LinkedIn profile auditor',
        caption:
          'Shipped and live at thejuicer.io. Grades a profile on a 3P scoring framework and returns concrete fixes rather than a grade alone.',
        steps: [
          'Profile input',
          'Score against the 3P framework',
          'Return specific, rewritable fixes per section',
        ],
      },
      {
        kind: 'workflow',
        title: 'Candidate Pool Finder',
        caption:
          'A React tool that reads a job description and generates platform search links plus Google X-Ray Boolean strings. The part of sourcing that is pure mechanical translation.',
        steps: [
          'Paste job description',
          'Extract role, stack and location signals',
          'Emit platform search URLs',
          'Emit Google X-Ray Boolean strings',
        ],
      },
    ],
    outcome: {
      kind: 'qualitative',
      status: 'documented',
      note:
        'No product metrics are claimed. HireOS is in build. The numbers on the About page belong to the recruiting record, not to this tool.',
      items: [
        {
          label: 'Explainability',
          body: 'Every rejection returns a reason and every score returns a rationale, so a shortlist can be defended without re-reading resumes.',
        },
        {
          label: 'Bias surface reduced',
          body: 'Employment gaps and compliance facts cannot influence fit ranking, because the ranking never receives them.',
        },
        {
          label: 'Failure moved earlier',
          body: 'An ineligible candidate is caught at intake rather than after a hiring manager has already reviewed the profile.',
        },
      ],
    },
    lessons: {
      status: 'partial',
      worked: [
        'Splitting eligibility from fit. It is the single decision the whole system rests on.',
        'Forcing the model to return a rationale per criterion. It made bad scores visible instead of plausible.',
        'Shipping the small tools separately. The Juicer and Candidate Pool Finder were useful long before the engine was finished.',
      ],
      failed: [
        'Treating work authorization as a weighted factor. Right most of the time is not good enough for a legal gate.',
        'One universal rubric across every role. Ten role profiles exist because a single rubric flattened the differences that matter.',
      ],
      changed: [
        'Gates moved from the prompt into deterministic code.',
        'Scoring stopped being a single number and became a set of criteria with reasons attached.',
      ],
      learned: [
        'The value is not the score. The value is that a recruiter can say out loud why the score is what it is.',
      ],
    },
    nextSteps: [
      'Finish the ten role profiles and pressure-test each rubric against real requisition history.',
      'Add a calibration pass so a recruiter can correct a fit score and have the correction recorded rather than lost.',
      'Close the loop between Candidate Pool Finder output and HireOS intake.',
    ],
    links: [{ label: 'The Juicer — live', href: 'https://thejuicer.io' }],
  },

  /* ---------------------------------------------------------- 02 */
  {
    slug: 'leadxelerate',
    number: '02',
    title: 'LeadXelerate',
    category: 'Lead & Talent Intelligence',
    description:
      'AI-powered lead and talent intelligence system designed to improve staffing and recruiting workflows.',
    year: '2026',
    status: 'IN BUILD',
    technologies: ['LLMs', 'Enrichment APIs', 'Automation', 'Prompt Engineering'],
    thumbnail: 'pipeline',
    contentStatus: 'placeholder',
    tagline: 'Intelligence about who to approach, before anyone is approached.',
    overview: [
      'LeadXelerate is an AI-powered lead and talent intelligence system aimed at the part of staffing that happens before a requisition is worked: knowing which accounts are hiring, which teams are growing, and which people are worth a first message.',
    ],
    problem: [
      'Staffing teams spend a large share of their week deciding where to point their effort, using signals that are scattered across job boards, company pages and personal networks.',
    ],
    context: [
      {
        label: 'Built for',
        body: 'Staffing and recruiting teams working account-side as well as candidate-side.',
      },
    ],
    approach: [
      {
        label: 'Signal before outreach',
        body: 'Treat lead qualification as an intelligence problem first and a messaging problem second.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Scope in definition',
        body: 'The system boundaries and data sources are still being defined. This case study will be written from build notes rather than reconstructed after the fact.',
      },
    ],
    aiLayer: {
      status: 'placeholder',
      body:
        'The AI layer for LeadXelerate is not yet documented. Technologies will be listed here only once they are actually used in the build.',
      stack: [],
      uses: [],
    },
    architecture: {
      status: 'placeholder',
      summary: 'Architecture not yet documented.',
      nodes: [],
      notes: [],
    },
    build: [],
    outcome: {
      kind: 'qualitative',
      status: 'placeholder',
      note: 'No outcomes are claimed. The system is in build and has not been measured.',
      items: [],
    },
    lessons: {
      status: 'placeholder',
      worked: [],
      failed: [],
      changed: [],
      learned: [],
    },
    nextSteps: [
      'Define the signal set and the data sources behind it.',
      'Decide what the system refuses to automate — outreach volume is the obvious risk.',
    ],
  },

  /* ---------------------------------------------------------- 03 */
  {
    slug: 'careeros',
    number: '03',
    title: 'CareerOS',
    category: 'Career Intelligence System',
    description: 'AI-powered career intelligence and workflow system.',
    year: '2026',
    status: 'IN BUILD',
    technologies: ['Python', 'LLMs', 'CLI', 'SQLite', 'Document Parsing', 'Prompt Engineering'],
    thumbnail: 'career',
    contentStatus: 'documented',
    tagline: 'A tailoring engine that cannot write a sentence, on purpose.',
    overview: [
      'TechXcelerate CareerOS is a local, approval-first AI job-application workspace. It imports a master resume, reads a job description, produces a transparent fit score, and builds a tailored resume package with a section-by-section before and after review.',
      'The operating principle is one line: the system prepares and recommends, you review and submit. There is no command, endpoint or background job that submits an application or sends a message.',
      'Phases 0, 1 and 2 are complete. Outreach and tracking, and analytics, are designed but not built.',
    ],
    problem: [
      'AI resume tools generate. That is the problem, not the feature. A model asked to tailor a resume will write a sentence that sounds true, and the person applying will not always catch it.',
      'Once a fabricated claim is in a resume, the cost lands on the candidate in an interview, not on the tool that produced it.',
      'The honest version of this tool has to be structurally incapable of inventing, rather than instructed not to.',
    ],
    context: [
      {
        label: 'Built for',
        body: 'Candidates tailoring applications at volume, starting with senior US IT recruiting roles as the first configured mode.',
      },
      {
        label: 'Runs where',
        body: 'Locally. Python 3.11+, a CLI, a local database. Candidate material never has to leave the machine to be tailored.',
      },
      {
        label: 'Non-negotiable',
        body: 'Nothing is exported without an explicit approval step, and approval is refused while the truth validator is failing.',
      },
    ],
    approach: [
      {
        label: 'Selection, not generation',
        body: 'The engine selects and reorders material that already exists in the approved resume. Bullets are ranked by relevance and reordered within each role. Existing skills are reordered so relevant ones read first. The summary is left verbatim.',
      },
      {
        label: 'Facts are immovable',
        body: 'Employers, titles and dates never move. There is no code path that rewrites them.',
      },
      {
        label: 'Gaps get reported, not filled',
        body: 'A keyword the documents do not evidence becomes an entry in the gap report. It never becomes a line in the resume.',
      },
      {
        label: 'The validator is a proof, not a filter',
        body: 'Because no new prose can be produced, the truth validator should have nothing to catch. It still runs on every draft and still blocks approval on any added claim, altered employment fact or unsupported figure.',
      },
      {
        label: 'Ship with empty hands',
        body: 'Initialisation writes placeholder files into the resume and evidence folders. They contain no candidate content, deliberately. The tool refuses to tailor until real approved material replaces them.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Initialise',
        body: 'career-os init creates the folder tree, writes default configuration, runs migrations and drops placeholder resume and evidence files.',
      },
      {
        step: '02',
        title: 'Validate configuration',
        body: 'career-os config validate reports exactly what is still missing and how to fix each item, rather than failing at run time.',
      },
      {
        step: '03',
        title: 'Import the job',
        body: 'A job description is pasted or imported with its source and URL, then inspected — including what the JD did not say.',
      },
      {
        step: '04',
        title: 'Score',
        body: 'A transparent 0 to 100 fit score against a fixed rubric, so the number can be argued with.',
      },
      {
        step: '05',
        title: 'Import and read the resume',
        body: 'Master resume imported from docx, pdf, Markdown or plain text. The evidence view shows what the system will treat as supported.',
      },
      {
        step: '06',
        title: 'Package and review',
        body: 'A tailored package is built, then reviewed section by section with a keyword map and a gap report, also written out as HTML.',
      },
      {
        step: '07',
        title: 'Approve, then export',
        body: 'Approval is explicit and separate. Export is refused without it.',
      },
    ],
    aiLayer: {
      status: 'documented',
      body:
        'The interesting decision here is where AI is not used. Ranking and matching are model-assisted. Prose generation is removed from the system entirely, which is what makes the truth guarantee hold.',
      stack: ['Python', 'LLMs', 'Prompt Engineering', 'Document Parsing'],
      uses: [
        {
          label: 'Relevance ranking',
          body: 'Bullets scored against the job description so the most relevant existing material rises within each role.',
        },
        {
          label: 'Keyword mapping',
          body: 'JD keywords matched against evidence in the approved documents, producing the keyword map and the gap report.',
        },
        {
          label: 'Fit scoring',
          body: 'A fixed 0 to 100 rubric, reported transparently rather than as an opaque verdict.',
        },
        {
          label: 'Deliberately excluded',
          body: 'No summary writing, no bullet rewriting, no claim synthesis. The absence is the feature.',
        },
      ],
    },
    architecture: {
      status: 'documented',
      summary:
        'A local pipeline with an approval gate between preparation and export. Every stage is a CLI command, which makes each step inspectable on its own.',
      nodes: [
        { id: 'INIT', label: 'Workspace', detail: 'Folder tree, configuration, migrations, placeholder evidence files.' },
        { id: 'INGEST', label: 'Ingest', detail: 'Master resume (docx / pdf / md / txt) and job description with source and URL.' },
        { id: 'SCORE', label: 'Score', detail: 'Transparent 0-100 fit score against a fixed rubric.' },
        { id: 'PACKAGE', label: 'Package', detail: 'Select and reorder existing material. Keyword map and gap report generated alongside.' },
        { id: 'VALIDATE', label: 'Truth validator', detail: 'Blocks approval on any added claim, altered employment fact or unsupported figure.' },
        { id: 'APPROVE', label: 'Approval gate', detail: 'Explicit human approval. Export is refused without it.' },
        { id: 'EXPORT', label: 'Export', detail: 'docx output. No submission, no messaging, no background job.' },
      ],
      notes: [
        'Phases 0, 1 and 2 are complete. Phase 3 (outreach and tracking) and Phase 4 (analytics) are designed, not built.',
        'No command, endpoint or background job can submit an application or send a message.',
        'Employers, titles and dates are immutable across the whole pipeline.',
        'Placeholder evidence files ship empty by design and block tailoring until replaced.',
      ],
    },
    build: [
      {
        kind: 'code',
        title: 'The command surface',
        language: 'bash',
        caption:
          'Each stage is its own command. The separation is the point: score, inspect, package, review and approve are distinct acts, and approval cannot be folded into export.',
        code: `# see what searches are saved, and render one to run yourself
career-os queries render --query senior-us-it

# paste a job description
career-os job paste --source linkedin --url "https://www.linkedin.com/jobs/view/..."

# look at what was stored and what the JD did not say
career-os job inspect <job-id>
career-os job score <job-id>

# import your own master resume - .docx, .pdf, .md or .txt
career-os resume import ~/Documents/my-resume.docx --mode senior_us_it_recruiter
career-os evidence check "databricks" "us staffing"

# build a tailored package, then review it section by section
career-os package create <job-id>
career-os package review <package-id> --keywords

# approval is explicit; export is refused without it
career-os package approve <package-id> --yes
career-os package export <package-id> --format docx`,
      },
      {
        kind: 'decision',
        title: 'Placeholders that refuse to be useful',
        caption:
          'career-os init writes placeholder resume and evidence files containing no candidate content. The tool will not tailor until they are replaced with approved material. It would have been easy to ship sample content; sample content is how invented material gets into a real application.',
      },
      {
        kind: 'workflow',
        title: 'Section-by-section review',
        caption:
          'The review step renders a before and after per section, plus a keyword map and a gap report, and writes review.html so the diff can be read outside the terminal.',
        steps: [
          'Before and after per resume section',
          'Keyword map: JD term to supporting evidence',
          'Gap report: JD terms with no evidence behind them',
          'Approval gate, refusing export until passed',
        ],
      },
    ],
    outcome: {
      kind: 'qualitative',
      status: 'documented',
      note:
        'Phases 0 to 2 are complete and working. No time-saved or success-rate figures are claimed, because none have been measured.',
      items: [
        {
          label: 'Fabrication made structurally impossible',
          body: 'With generation removed, the truth validator functions as a proof rather than a filter. There is no code path that can produce an unsupported sentence.',
        },
        {
          label: 'Gaps become visible',
          body: 'Every JD keyword without evidence surfaces in a gap report instead of being quietly papered over.',
        },
        {
          label: 'Submission stays human',
          body: 'No command or background job can submit or message. The approval gate is the only route to an export.',
        },
        {
          label: 'Local by default',
          body: 'The workspace, the database and the documents stay on the machine.',
        },
      ],
    },
    lessons: {
      status: 'partial',
      worked: [
        'Removing generation instead of constraining it. Every guarantee downstream follows from that one deletion.',
        'Shipping empty placeholders that block the happy path until real content is supplied.',
        'A CLI per stage, which made each step reviewable in isolation.',
      ],
      failed: [
        'Trying to make the tailoring feel impressive. The impressive version writes prose, and the prose is the liability.',
      ],
      changed: [
        'The truth validator changed role. It started as a safety filter over generated text and became a proof over selected text.',
        'Phases 3 and 4 were designed up front and then deliberately not built, rather than half-shipped.',
      ],
      learned: [
        'A constraint stated in a prompt is a preference. A constraint enforced by the absence of a code path is a guarantee.',
      ],
    },
    nextSteps: [
      'Phase 3: outreach and tracking, holding the same approval-first rule.',
      'Phase 4: analytics across applications, without turning the workspace into a dashboard.',
      'More resume modes beyond the first senior US IT recruiter configuration.',
    ],
  },

  /* ---------------------------------------------------------- 04 */
  {
    slug: 'ai-recruitment-workflows',
    number: '04',
    title: 'AI Recruitment Workflows',
    category: 'Automation & Sourcing',
    description:
      'Practical AI workflows designed to improve sourcing, screening, matching, outreach, and recruitment operations.',
    year: '2025 — 2026',
    status: 'ONGOING',
    technologies: ['GPT-4o', 'Apify', 'Clay', 'Smartlead', 'Prompt Engineering', 'React'],
    thumbnail: 'workflow',
    contentStatus: 'documented',
    tagline: 'The parts of recruiting that were never judgement calls.',
    overview: [
      'This is the working set of workflows I run on a live recruiting desk, rather than a single product. Each one automates a step that was mechanical translation dressed up as skilled work.',
      'The largest is a sourcing pipeline chaining Apify, Clay, GPT-4o and Smartlead for candidate enrichment, qualification and compliant outreach at scale.',
      'The smallest is a React tool that turns a job description into platform search links and Google X-Ray Boolean strings.',
    ],
    problem: [
      'A recruiter writing a Boolean string is doing translation, not evaluation. So is copying a candidate record between an enrichment tool and an outreach sequence.',
      'These steps are individually small and collectively most of the week. They are also where errors are cheapest to make and most expensive to notice.',
      'Automating them is only safe if the automation stops before the point where judgement or compliance starts.',
    ],
    context: [
      {
        label: 'Built for',
        body: 'A live US IT recruiting desk covering Java and .NET, Data Engineering, Cloud, DevOps and AI/ML roles.',
      },
      {
        label: 'Volume shape',
        body: 'High-demand roles where the pipeline has to be built proactively rather than in response to a requisition.',
      },
      {
        label: 'Boundary',
        body: 'Outreach is compliant and rate-limited by design. Volume is not the goal; a qualified list is.',
      },
    ],
    approach: [
      {
        label: 'Automate translation, not evaluation',
        body: 'A JD to a Boolean string is deterministic. A candidate to a shortlist is not. The workflows stop at that line.',
      },
      {
        label: 'Chain specialised tools',
        body: 'Apify for collection, Clay for enrichment, GPT-4o for qualification, Smartlead for outreach. Each tool does one thing and hands off a structured record.',
      },
      {
        label: 'Qualification before contact',
        body: 'The model qualifies against explicit criteria before anyone is messaged, so outreach volume tracks the qualified set rather than the collected set.',
      },
      {
        label: 'Keep the escape hatch',
        body: 'Every generated Boolean string and search link is inspectable and editable before it is run. The tool proposes; the recruiter runs it.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Parse the requirement',
        body: 'The job description is broken into role, stack, seniority and location signals, including the must-haves the JD implies but does not state.',
      },
      {
        step: '02',
        title: 'Generate the search surface',
        body: 'Platform search URLs and Google X-Ray Boolean strings emitted directly from the parsed requirement.',
      },
      {
        step: '03',
        title: 'Collect',
        body: 'Apify handles structured collection from the sources the search surface points at.',
      },
      {
        step: '04',
        title: 'Enrich',
        body: 'Clay fills in the record so qualification has something to work with beyond a name and a title.',
      },
      {
        step: '05',
        title: 'Qualify',
        body: 'GPT-4o scores the enriched record against explicit role criteria and returns a reason, not just a verdict.',
      },
      {
        step: '06',
        title: 'Outreach',
        body: 'Smartlead runs compliant, sequenced outreach to the qualified set only.',
      },
    ],
    aiLayer: {
      status: 'documented',
      body:
        'AI sits in two places: reading unstructured text into structure, and qualifying an enriched record against stated criteria. Collection, enrichment and delivery are ordinary tooling, and are better for it.',
      stack: ['GPT-4o', 'Prompt Engineering', 'Apify', 'Clay', 'Smartlead', 'React'],
      uses: [
        {
          label: 'JD parsing',
          body: 'Unstructured requirement to named signals: role, stack, seniority, location, implicit must-haves.',
        },
        {
          label: 'Boolean and X-Ray generation',
          body: 'Parsed signals to Google X-Ray Boolean strings and platform search links, editable before they run.',
        },
        {
          label: 'Candidate qualification',
          body: 'Enriched records scored against explicit criteria, returning the reason alongside the score.',
        },
        {
          label: 'Outreach drafting',
          body: 'Message drafting for the qualified set, sent through a compliant sequencing tool rather than ad hoc.',
        },
      ],
    },
    architecture: {
      status: 'documented',
      summary:
        'A linear chain of specialised tools. Each stage narrows the set and enriches what survives, so the expensive steps only ever run on records that earned them.',
      nodes: [
        { id: 'JD', label: 'JD parse', detail: 'Requirement broken into role, stack, seniority and location signals.' },
        { id: 'SEARCH', label: 'Search surface', detail: 'Platform links and Google X-Ray Boolean strings, editable before use.' },
        { id: 'APIFY', label: 'Apify', detail: 'Structured collection from the sources the search surface points at.' },
        { id: 'CLAY', label: 'Clay', detail: 'Record enrichment so qualification has real inputs.' },
        { id: 'GPT', label: 'GPT-4o', detail: 'Qualification against explicit criteria, returning score plus reason.' },
        { id: 'SMARTLEAD', label: 'Smartlead', detail: 'Compliant sequenced outreach to the qualified set only.' },
      ],
      notes: [
        'Qualification runs before outreach, never after.',
        'Generated Boolean strings and links are always inspectable and editable before they run.',
        'Outreach volume is bounded by the qualified set, not by collection throughput.',
      ],
    },
    build: [
      {
        kind: 'workflow',
        title: 'Apify to Clay to GPT-4o to Smartlead',
        caption:
          'The production sourcing chain. Each handoff is a structured record, which is what makes a stage replaceable without rewriting the rest.',
        steps: [
          'Apify — structured collection',
          'Clay — enrichment',
          'GPT-4o — qualification with stated reasons',
          'Smartlead — compliant sequenced outreach',
        ],
      },
      {
        kind: 'interface',
        title: 'Candidate Pool Finder',
        caption:
          'React tool. Job description in, platform search links and Google X-Ray Boolean strings out, editable before anything is run.',
        steps: [
          'Paste JD',
          'Review extracted signals',
          'Edit the generated Boolean if needed',
          'Run the search on the platform',
        ],
      },
      {
        kind: 'decision',
        title: 'Where the automation stops',
        caption:
          'The chain deliberately ends at a qualified list and a drafted sequence. Deciding who to submit, and standing behind that decision with a client, stays with the recruiter.',
      },
    ],
    outcome: {
      kind: 'qualitative',
      status: 'documented',
      note:
        'These workflows run on a live desk. The recruiting metrics on the About page cover full-cycle delivery over several years and are not attributed to this tooling.',
      items: [
        {
          label: 'Mechanical steps removed',
          body: 'Boolean construction and record handoff stopped being manual work without changing who makes the decisions.',
        },
        {
          label: 'Outreach tracks qualification',
          body: 'Because qualification runs before contact, the volume sent is bounded by the qualified set rather than by what was collected.',
        },
        {
          label: 'Reusable across roles',
          body: 'The same chain serves Java and .NET, Data Engineering, Cloud, DevOps and AI/ML requirements by swapping the criteria, not the pipeline.',
        },
      ],
    },
    lessons: {
      status: 'partial',
      worked: [
        'Drawing an explicit line between translation and evaluation, then automating only one side of it.',
        'Structured records at every handoff, which made individual tools swappable.',
        'Keeping generated Boolean strings editable. The edits are where the recruiting knowledge actually lives.',
      ],
      failed: [
        'Early versions optimised for throughput. More collected records simply produced more unqualified outreach.',
      ],
      changed: [
        'Qualification moved ahead of outreach instead of running as a filter afterwards.',
      ],
      learned: [
        'A sourcing pipeline is judged by the quality of the list it refuses to send to, not by the size of the list it builds.',
      ],
    },
    nextSteps: [
      'Feed qualified records straight into HireOS intake rather than re-entering them.',
      'Track which generated Boolean strings a recruiter edits, and use the edits to improve generation.',
    ],
  },

  /* ---------------------------------------------------------- 05 */
  {
    slug: 'ai-agents-rag-systems',
    number: '05',
    title: 'AI Agents / RAG Systems',
    category: 'Experiments',
    description:
      'Experiments and implementations involving AI agents, RAG, LLM workflows, and automation.',
    year: '2025 — 2026',
    status: 'RESEARCH',
    technologies: ['LLMs', 'RAG', 'AI Agents', 'Prompt Engineering', 'Python'],
    thumbnail: 'agents',
    contentStatus: 'partial',
    tagline: 'The experiments that decide what makes it into the products.',
    overview: [
      'This is the experiment log rather than a shipped product. Agent patterns, retrieval setups and LLM workflows get tried here first, and the ones that survive contact with a real recruiting problem move into TechXcelerate OS or the workflow set.',
      'Keeping it separate is deliberate. A product page that quietly includes every experiment overstates what is actually running.',
    ],
    problem: [
      'Agent and RAG demos work on clean questions. Recruiting questions are not clean: the source documents are resumes and job descriptions, both of which are marketing documents written by people with an incentive.',
      'The open question this work exists to answer is which of these patterns hold up when the retrieval corpus is unreliable and the cost of a confident wrong answer is a bad submission.',
    ],
    context: [
      {
        label: 'Built for',
        body: 'Deciding what goes into the products. Nothing here is presented as production.',
      },
      {
        label: 'Source material',
        body: 'Recruiting artefacts — job descriptions, resumes, requirement notes — chosen precisely because they are messy.',
      },
    ],
    approach: [
      {
        label: 'Test against real recruiting text',
        body: 'Experiments are run against actual JDs and resumes rather than benchmark corpora, because the failure modes only show up there.',
      },
      {
        label: 'Prefer the boring result',
        body: 'If a deterministic step matches an agent on a task, the deterministic step wins and the agent is dropped.',
      },
      {
        label: 'Promote by evidence',
        body: 'A pattern only moves into a product after it has survived a real requirement end to end.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Pick a real failure',
        body: 'Each experiment starts from something that actually went wrong on the desk, not from a technique looking for a use.',
      },
      {
        step: '02',
        title: 'Build the smallest version',
        body: 'The narrowest implementation that could settle the question.',
      },
      {
        step: '03',
        title: 'Run it against messy inputs',
        body: 'Real job descriptions and real resumes, including the badly written ones.',
      },
      {
        step: '04',
        title: 'Keep, fold in, or drop',
        body: 'Promoted into a product, folded into an existing workflow, or discarded with the reason recorded.',
      },
    ],
    aiLayer: {
      status: 'partial',
      body:
        'Individual experiments are not written up yet. The stack below lists the technologies actually in use across this work; specific implementations will be documented as they are promoted or dropped.',
      stack: ['LLMs', 'RAG', 'AI Agents', 'Prompt Engineering', 'Python'],
      uses: [
        {
          label: 'Retrieval over recruiting documents',
          body: 'Testing how retrieval behaves when the corpus is resumes and job descriptions rather than reference text.',
        },
        {
          label: 'Agent patterns',
          body: 'Where a multi-step agent genuinely beats a fixed pipeline, and where it just adds variance.',
        },
        {
          label: 'Prompt design',
          body: 'Structured output and required rationale fields, carried over from what worked in HireOS.',
        },
      ],
    },
    architecture: {
      status: 'placeholder',
      summary:
        'No single architecture. Individual experiment write-ups, each with its own diagram, will be added here as they are documented.',
      nodes: [],
      notes: [],
    },
    build: [
      {
        kind: 'decision',
        title: 'Why this is not on the product pages',
        caption:
          'Experiments are listed separately so the shipped work is not padded by things that were only ever tried. An experiment that has not been promoted is not a capability.',
      },
    ],
    outcome: {
      kind: 'qualitative',
      status: 'partial',
      note: 'Research work. No outcomes are claimed and none have been measured.',
      items: [
        {
          label: 'Feeds the products',
          body: 'The structured-output-with-rationale pattern used in HireOS scoring came out of this work.',
        },
      ],
    },
    lessons: {
      status: 'partial',
      worked: [
        'Starting from a real failure on the desk rather than from a technique.',
      ],
      failed: [],
      changed: [],
      learned: [
        'Most agent complexity disappears once the underlying task is stated precisely enough.',
      ],
    },
    nextSteps: [
      'Write up individual experiments with their inputs, results and the reason each was kept or dropped.',
      'Document the retrieval setup used against recruiting documents.',
    ],
  },

  /* ---------------------------------------------------------- 06 */
  {
    slug: 'baliyan-labs',
    number: '06',
    title: 'Baliyan Labs',
    category: 'AI Learning Studio',
    description:
      'AI Learning Studio focused on learning AI, building with AI, and applying AI.',
    year: '2026',
    status: 'ONGOING',
    technologies: ['LLMs', 'Prompt Engineering', 'Technical Writing'],
    thumbnail: 'labs',
    contentStatus: 'partial',
    tagline: 'Learning in public, at the pace the tools actually change.',
    overview: [
      'Baliyan Labs is the learning surface: working through AI in public, building small things to understand them, and writing up what applies to recruiting work.',
      'It is the front of the chain that ends in the case studies on this site. A LinkedIn post becomes an insight, an insight becomes a project, a project becomes a case study.',
    ],
    problem: [
      'The gap between reading about a technique and knowing when it fails is only closed by building something with it.',
      'Most AI content for recruiters stops at the demo. What is missing is the part where someone says which approach they abandoned and why.',
    ],
    context: [
      {
        label: 'Audience',
        body: 'Recruiters and staffing people trying to work out which parts of AI are actually relevant to their week.',
      },
      {
        label: 'Format',
        body: 'Short public posts, longer written insights, and the small builds that sit behind them.',
      },
    ],
    approach: [
      {
        label: 'Build to understand',
        body: 'A technique is not learned until something small has been shipped with it.',
      },
      {
        label: 'Write the failures down',
        body: 'The abandoned approach is usually the more useful half of the write-up.',
      },
      {
        label: 'Keep the chain visible',
        body: 'Post to insight to project to case study, so a reader can follow an idea from a first observation to a finished system.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Observation',
        body: 'Something on the recruiting desk that AI either helped with or conspicuously did not.',
      },
      {
        step: '02',
        title: 'Small build',
        body: 'The smallest thing that tests the observation.',
      },
      {
        step: '03',
        title: 'Write-up',
        body: 'What held, what broke, and what it changed about the way the work gets done.',
      },
      {
        step: '04',
        title: 'Promotion',
        body: 'If it survives, it becomes a project on this site with a full case study.',
      },
    ],
    aiLayer: {
      status: 'partial',
      body:
        'The subject matter rather than the implementation. Individual builds are documented on their own project pages once they are substantial enough to warrant one.',
      stack: ['LLMs', 'Prompt Engineering'],
      uses: [
        {
          label: 'Applied study',
          body: 'Working through prompting, agents and retrieval by building against real recruiting problems.',
        },
        {
          label: 'Technical writing',
          body: 'Turning the builds into written explanations aimed at recruiters rather than engineers.',
        },
      ],
    },
    architecture: {
      status: 'documented',
      summary: 'A content chain rather than a technical system.',
      nodes: [
        { id: 'POST', label: 'LinkedIn post', detail: 'A short public observation from the recruiting desk.' },
        { id: 'INSIGHT', label: 'Insight', detail: 'The longer written version, with the reasoning included.' },
        { id: 'PROJECT', label: 'Project', detail: 'Something built to test whether the insight holds.' },
        { id: 'CASE', label: 'Case study', detail: 'The full write-up on this site, failures included.' },
      ],
      notes: [
        'Each stage is optional. Most observations stop at the first one, and that is the correct outcome.',
      ],
    },
    build: [
      {
        kind: 'workflow',
        title: 'The publishing chain',
        caption:
          'The same chain the Insights section is built around. It exists so a reader can trace a finished system back to the moment the idea first showed up.',
        steps: ['LinkedIn post', 'Insight', 'Project', 'Case study'],
      },
    ],
    outcome: {
      kind: 'qualitative',
      status: 'partial',
      note: 'An ongoing practice. No audience or engagement figures are claimed here.',
      items: [
        {
          label: 'Feeds the archive',
          body: 'The projects on this site started as observations from the desk before they were systems.',
        },
      ],
    },
    lessons: {
      status: 'partial',
      worked: [
        'Writing for recruiters rather than for engineers. It forces the explanation to survive without jargon.',
      ],
      failed: [],
      changed: [],
      learned: [
        'The build is what makes the write-up worth reading. Without it the post is just a summary of someone else.',
      ],
    },
    nextSteps: [
      'Publish the written insights behind the LinkedIn series on AI in recruitment.',
      'Link each published insight to the project it produced.',
    ],
  },
]

/* ---------- lookup helpers used by the case study routes ---------- */

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const getProjectNeighbours = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: undefined, next: undefined }
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  }
}

export const categories = Array.from(new Set(projects.map((p) => p.category)))
