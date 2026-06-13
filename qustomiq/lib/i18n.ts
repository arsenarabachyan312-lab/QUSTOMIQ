export type Locale = "ru" | "en";

export const dict = {
  ru: {
    nav: {
      services: "Услуги",
      ai: "AI-решения",
      process: "Процесс",
      about: "О нас",
      contacts: "Контакты",
      cta: "Обсудить проект",
    },
    hero: {
      badge: "IT-компания нового поколения · Россия и СНГ",
      h1_before: "Автоматизация",
      h1_line2_pre: "бизнеса с помощью ",
      h1_accent: "AI",
      sub: "Кастомная разработка, интеграции и AI-инструменты вокруг ядра вашего бизнеса. Мы не сдаём код и исчезаем — мы остаёмся технологическим партнёром надолго.",
      cta_primary: "Обсудить проект",
      cta_secondary: "Посмотреть услуги →",
    },
    clients: {
      label: "Технологии",
      names: [
        "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
        "GPT-4o", "Claude", "1С", "Bitrix24", "Docker",
        "RAG", "Vector DB", "Redis", "Kubernetes", "REST API",
        "React", "Next.js", "TypeScript",
      ],
    },
    services: {
      heading: "Наши услуги",
      sub: "Полный стек технологических решений для вашего бизнеса",
      items: [
        {
          title: "Разработка",
          desc: "Кастомные веб- и мобильные приложения, внутренние системы и порталы под задачи вашего бизнеса.",
          tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
        },
        {
          title: "Интеграции",
          desc: "Связываем CRM, ERP, 1С и сторонние API в единую экосистему без потерь данных и даунтайма.",
          tags: ["1С", "Bitrix24", "REST API", "Webhooks"],
        },
        {
          title: "AI-решения",
          desc: "Умные ассистенты, RAG-системы и аналитика на базе LLM — встроенные в ваши процессы.",
          tags: ["GPT-4o", "Claude", "RAG", "Vector DB"],
        },
        {
          title: "Поддержка",
          desc: "Мониторинг, обновления и оперативное решение инцидентов — так вы можете сфокусироваться на бизнесе.",
          tags: ["SLA", "24/7", "CI/CD", "Observability"],
        },
      ],
    },
    partner: {
      heading: "Партнёр, а не подрядчик",
      sub: "Мы входим в проект, как в собственный — берём ответственность и остаёмся рядом.",
      principles: [
        {
          title: "Погружаемся в ваш бизнес",
          desc: "Изучаем процессы, KPI и боли — чтобы предложить решение, а не просто написать код.",
        },
        {
          title: "Берём ответственность за результат",
          desc: "Измеримые цели фиксируются в договоре. Нам важно, чтобы система работала на ваш рост.",
        },
        {
          title: "Остаёмся на поддержке",
          desc: "После запуска продолжаем развивать продукт: мониторинг, обновления, новые фичи.",
        },
        {
          title: "Говорим на вашем языке",
          desc: "Никакого жаргона — только чёткие дедлайны, демо и понятные отчёты.",
        },
      ],
    },
    ai: {
      heading: "AI по отделам",
      sub: "Готовые решения для каждого подразделения — разворачиваем за 2–4 недели",
      live: "Live",
      hourCta: "Получить час с AI →",
      hourModal: {
        title: "Час с AI-ассистентом",
        desc: "Бесплатная 60-минутная сессия: разберём задачи вашего отдела и подберём подходящий AI-инструмент.",
        name: "Ваше имя",
        contact: "Телефон или email",
        question: "Что хотите автоматизировать?",
        submit: "Записаться",
        success: "Готово! Свяжемся в течение 24 часов и назначим время.",
      },
      tabs: ["Продажи", "Поддержка", "HR", "Логистика"],
      depts: {
        Продажи: {
          title: "AI-решение для продаж",
          metric: "+38%",
          metricLabel: "к конверсии в сделку",
          tasks: ["Квалификация лидов", "Автоподготовка КП", "Аналитика воронки"],
          stack: ["CRM", "Bitrix", "RAG", "GPT-4o"],
          hourContext: "Продажи и конверсия",
        },
        Поддержка: {
          title: "AI-решение для поддержки",
          metric: "−56%",
          metricLabel: "времени на тикет",
          tasks: ["Ответы 24/7", "Маршрутизация тикетов", "База знаний на ваших данных"],
          stack: ["Helpdesk", "Telegram", "RAG", "Claude"],
          hourContext: "Клиентская поддержка",
        },
        HR: {
          title: "AI-решение для HR",
          metric: "x4",
          metricLabel: "скорость скрининга",
          tasks: ["Скрининг резюме", "Онбординг-ассистент", "Аналитика найма"],
          stack: ["1С:ЗУП", "ATS", "Vector DB", "LLM"],
          hourContext: "HR и подбор персонала",
        },
        Логистика: {
          title: "AI-решение для логистики",
          metric: "x10",
          metricLabel: "обработка документов",
          tasks: ["Трекинг отгрузок", "Распознавание накладных", "Прогноз сроков"],
          stack: ["ERP", "EDI", "OCR", "API"],
          hourContext: "Логистика и документооборот",
        },
      },
    },
    process: {
      heading: "Как мы работаем",
      sub: "От аудита до внедрения — прозрачно и по шагам",
      steps: [
        { n: "01", title: "Аудит", desc: "Изучаем процессы, инфраструктуру и цели — формируем техническое задание." },
        { n: "02", title: "Прототип", desc: "Собираем MVP или кликабельный прототип за 1–2 недели для валидации." },
        { n: "03", title: "Разработка", desc: "Итеративная разработка с демо каждые 2 недели. Полная прозрачность." },
        { n: "04", title: "Внедрение и поддержка", desc: "Запуск, обучение команды и дальнейшее развитие продукта." },
      ],
    },
    about: {
      heading: "О нас",
      paragraphs: [
        "За QUSTOMIQ стоят инженеры и менеджеры с опытом в крупных проектах автоматизации бизнеса. Мы прошли путь от управления IT-проектами и архитектуры до прямой работы с клиентами — и поняли главное: бизнесу нужен не подрядчик, который сдал код и исчез, а партнёр, который остаётся рядом.",
        "Поэтому мы собрались и создали свою компанию. Чтобы работать иначе: глубоко погружаться в задачу, брать ответственность за результат и развивать продукт вместе с вами — а не закрывать тикеты.",
        "За плечами — годы реальных проектов по автоматизации, системным интеграциям и AI-решениям для бизнеса.",
      ],
    },
    team: {
      heading: "Команда",
      sub: "Люди, которые работают над вашим проектом",
      members: [
        {
          name: "Арсен Арабачян",
          role: "Co-founder & CEO",
          photo: "/Arsen1webp.webp",
          bio: "Развитие бизнеса, работа с клиентами и продажи. Отвечает за то, чтобы решение закрывало реальную задачу бизнеса, а не существовало ради технологии. Опыт в управлении клиентскими отношениями и автоматизации процессов.",
        },
        {
          name: "Владимир Якимков",
          role: "Co-founder & CTO",
          photo: "/vladimir.webp",
          bio: "Продукт, разработка и команда. Отвечает за архитектуру, сроки и качество — от прототипа до внедрения. Опыт руководства IT-проектами в крупном бизнесе.",
        },
      ],
    },
    whyus: {
      heading: "Почему с нами работают",
      items: [
        {
          title: "Погружение в бизнес",
          desc: "Изучаем процессы и цели, а не просто берём ТЗ. Решаем задачу, а не пишем код ради кода.",
        },
        {
          title: "Ответственность за результат",
          desc: "Измеримые цели фиксируем в договоре. Нам важно, чтобы система работала на ваш рост.",
        },
        {
          title: "Скорость",
          desc: "Прототип за 1–2 недели, демо каждые 2 недели. Вы видите прогресс, а не ждёте вслепую.",
        },
        {
          title: "Поддержка после запуска",
          desc: "Не пропадаем после сдачи. Мониторинг, обновления, развитие продукта.",
        },
      ],
    },
    cases: {
      heading: "Кейсы",
      sub: "Проекты под NDA. Детали, метрики и архитектуру — расскажем на созвоне.",
      task_label: "Задача",
      solution_label: "Решение",
      effect_label: "Эффект",
      items: [
        {
          title: "Автоматизация полевых сотрудников",
          task: "Торговые представители тратят часы на ручные отчёты с точек, данные приходят с опозданием и ошибками.",
          solution: "Мобильное приложение для сбора данных + автоматическая выгрузка в CRM + дашборд для супервайзера в реальном времени.",
          effect: "Время на отчётность сокращается в разы, руководитель видит ситуацию по полю онлайн.",
        },
        {
          title: "Интеграция разрозненных систем",
          task: "CRM, 1С и складская система живут отдельно, данные дублируются и расходятся.",
          solution: "Единый слой интеграции через API, синхронизация без потерь и ручного переноса.",
          effect: "Один источник правды, меньше ошибок, прозрачность для всех отделов.",
        },
        {
          title: "AI-ассистент для обработки документов",
          task: "Сотрудники вручную вносят данные из накладных, счетов и заявок.",
          solution: "AI-распознавание документов с автоматическим занесением в систему.",
          effect: "Обработка ускоряется кратно, человек только проверяет, а не вводит.",
        },
      ],
    },
    cta: {
      heading: "Обсудим ваш проект?",
      sub: "Расскажите задачу — подберём решение и оценим за 24 часа.",
      name_placeholder: "Ваше имя",
      company_placeholder: "Компания",
      position_placeholder: "Должность",
      contact_placeholder: "Телефон или email",
      messenger_label: "Предпочитаемый мессенджер",
      messenger_options: ["Telegram", "WhatsApp", "Viber", "Не важно"],
      task_placeholder: "Коротко о задаче",
      submit: "Отправить заявку",
      or: "или напишите напрямую",
      email: "hello@qustomiq.ru",
    },
    footer: {
      tagline: "Технологический партнёр — надолго.",
      nav: ["Услуги", "AI-решения", "Процесс", "Кейсы", "Контакты"],
      contacts_heading: "Контакты",
      email: "hello@qustomiq.ru",
      rights: "© 2026 QUSTOMIQ. Все права защищены.",
    },
  },
  en: {
    nav: {
      services: "Services",
      ai: "AI Solutions",
      process: "Process",
      about: "About",
      contacts: "Contacts",
      cta: "Discuss Project",
    },
    hero: {
      badge: "Next-generation IT company · Russia & CIS",
      h1_before: "Automate your",
      h1_line2_pre: "business with ",
      h1_accent: "AI",
      sub: "Custom development, integrations and AI tools around the core of your business. We don't deliver code and disappear — we stay as your technology partner for the long run.",
      cta_primary: "Discuss Project",
      cta_secondary: "View Services →",
    },
    clients: {
      label: "Technologies",
      names: [
        "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
        "GPT-4o", "Claude", "1C", "Bitrix24", "Docker",
        "RAG", "Vector DB", "Redis", "Kubernetes", "REST API",
        "React", "Next.js", "TypeScript",
      ],
    },
    services: {
      heading: "Our Services",
      sub: "Full-stack technology solutions for your business",
      items: [
        {
          title: "Development",
          desc: "Custom web and mobile apps, internal systems and portals tailored to your business needs.",
          tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
        },
        {
          title: "Integrations",
          desc: "Connecting CRM, ERP, 1C and third-party APIs into a unified ecosystem without data loss or downtime.",
          tags: ["1C", "Bitrix24", "REST API", "Webhooks"],
        },
        {
          title: "AI Solutions",
          desc: "Smart assistants, RAG systems and LLM-powered analytics — built into your processes.",
          tags: ["GPT-4o", "Claude", "RAG", "Vector DB"],
        },
        {
          title: "Support",
          desc: "Monitoring, updates and rapid incident resolution — so you can focus on your business.",
          tags: ["SLA", "24/7", "CI/CD", "Observability"],
        },
      ],
    },
    partner: {
      heading: "Partner, not contractor",
      sub: "We treat every project as our own — we take responsibility and stay by your side.",
      principles: [
        {
          title: "We dive into your business",
          desc: "We study your processes, KPIs and pain points — to propose a solution, not just write code.",
        },
        {
          title: "We take responsibility for results",
          desc: "Measurable goals are fixed in the contract. We care that the system drives your growth.",
        },
        {
          title: "We stay for support",
          desc: "After launch we keep developing the product: monitoring, updates, new features.",
        },
        {
          title: "We speak your language",
          desc: "No jargon — only clear deadlines, demos and understandable reports.",
        },
      ],
    },
    ai: {
      heading: "AI by Department",
      sub: "Ready solutions for every division — deployed in 2–4 weeks",
      live: "Live",
      hourCta: "Get an AI Hour →",
      hourModal: {
        title: "1 Hour with AI Assistant",
        desc: "Free 60-minute session: we'll analyze your department's challenges and find the right AI tool.",
        name: "Your name",
        contact: "Phone or email",
        question: "What do you want to automate?",
        submit: "Book a Session",
        success: "Done! We'll reach out within 24 hours to schedule a time.",
      },
      tabs: ["Sales", "Support", "HR", "Logistics"],
      depts: {
        Sales: {
          title: "AI Solution for Sales",
          metric: "+38%",
          metricLabel: "conversion to deal",
          tasks: ["Lead qualification", "Auto proposal prep", "Funnel analytics"],
          stack: ["CRM", "Bitrix", "RAG", "GPT-4o"],
          hourContext: "Sales & Conversion",
        },
        Support: {
          title: "AI Solution for Support",
          metric: "−56%",
          metricLabel: "time per ticket",
          tasks: ["24/7 responses", "Ticket routing", "Knowledge base on your data"],
          stack: ["Helpdesk", "Telegram", "RAG", "Claude"],
          hourContext: "Customer Support",
        },
        HR: {
          title: "AI Solution for HR",
          metric: "x4",
          metricLabel: "screening speed",
          tasks: ["Resume screening", "Onboarding assistant", "Hiring analytics"],
          stack: ["1C:ZUP", "ATS", "Vector DB", "LLM"],
          hourContext: "HR & Recruiting",
        },
        Logistics: {
          title: "AI Solution for Logistics",
          metric: "x10",
          metricLabel: "document processing",
          tasks: ["Shipment tracking", "Invoice recognition", "Delivery forecasting"],
          stack: ["ERP", "EDI", "OCR", "API"],
          hourContext: "Logistics & Documents",
        },
      },
    },
    process: {
      heading: "How We Work",
      sub: "From audit to launch — transparent and step by step",
      steps: [
        { n: "01", title: "Audit", desc: "We study your processes, infrastructure and goals — and form a technical specification." },
        { n: "02", title: "Prototype", desc: "We build an MVP or clickable prototype in 1–2 weeks for validation." },
        { n: "03", title: "Development", desc: "Iterative development with demos every 2 weeks. Full transparency." },
        { n: "04", title: "Launch & Support", desc: "Go-live, team training and ongoing product development." },
      ],
    },
    about: {
      heading: "About Us",
      paragraphs: [
        "Behind QUSTOMIQ are engineers and managers with experience in large-scale business automation projects. We've gone from managing IT projects and architecture to working directly with clients — and understood the key thing: a business needs not a contractor who delivers code and disappears, but a partner who stays.",
        "That's why we came together and built our own company. To work differently: dive deep into the problem, take responsibility for results, and develop the product together with you — not just close tickets.",
        "Behind us are years of real projects in automation, system integrations, and AI solutions for business.",
      ],
    },
    team: {
      heading: "Team",
      sub: "The people working on your project",
      members: [
        {
          name: "Arsen Arabachyan",
          role: "Co-founder & CEO",
          photo: "/Arsen1webp.webp",
          bio: "Business development, client relations and sales. Ensures the solution solves a real business problem, not just exists for technology's sake. Experience in client relationship management and process automation.",
        },
        {
          name: "Vladimir Yakimkov",
          role: "Co-founder & CTO",
          photo: "/vladimir.webp",
          bio: "Product, development and team. Responsible for architecture, timelines and quality — from prototype to deployment. Experience leading IT projects in large enterprises.",
        },
      ],
    },
    whyus: {
      heading: "Why teams choose us",
      items: [
        {
          title: "Business immersion",
          desc: "We study your processes and goals, not just take a spec. We solve the problem, not write code for the sake of code.",
        },
        {
          title: "Accountability for results",
          desc: "Measurable goals are fixed in the contract. We care that the system drives your growth.",
        },
        {
          title: "Speed",
          desc: "Prototype in 1–2 weeks, demos every 2 weeks. You see progress, not wait in the dark.",
        },
        {
          title: "Post-launch support",
          desc: "We don't disappear after delivery. Monitoring, updates, product development.",
        },
      ],
    },
    cases: {
      heading: "Cases",
      sub: "Projects under NDA. Details, metrics and architecture — we'll share on a call.",
      task_label: "Challenge",
      solution_label: "Solution",
      effect_label: "Outcome",
      items: [
        {
          title: "Field staff automation",
          task: "Sales reps spend hours on manual reports from the field; data arrives late and with errors.",
          solution: "Mobile app for data collection + automatic sync to CRM + real-time supervisor dashboard.",
          effect: "Reporting time cut dramatically, manager sees field situation online.",
        },
        {
          title: "Disconnected systems integration",
          task: "CRM, 1C and warehouse system live separately; data is duplicated and diverges.",
          solution: "Unified integration layer via API, sync without data loss or manual transfer.",
          effect: "Single source of truth, fewer errors, full transparency across departments.",
        },
        {
          title: "AI document processing assistant",
          task: "Staff manually enter data from invoices, bills and requests.",
          solution: "AI document recognition with automatic data entry into the system.",
          effect: "Processing speed multiplied, humans only verify rather than type.",
        },
      ],
    },
    cta: {
      heading: "Let's discuss your project?",
      sub: "Tell us your task — we'll find a solution and estimate in 24 hours.",
      name_placeholder: "Your name",
      company_placeholder: "Company",
      position_placeholder: "Job title",
      contact_placeholder: "Phone or email",
      messenger_label: "Preferred messenger",
      messenger_options: ["Telegram", "WhatsApp", "Viber", "Any"],
      task_placeholder: "Brief description of the task",
      submit: "Send Request",
      or: "or write directly",
      email: "hello@qustomiq.ru",
    },
    footer: {
      tagline: "Technology partner — for the long run.",
      nav: ["Services", "AI Solutions", "Process", "Cases", "Contacts"],
      contacts_heading: "Contacts",
      email: "hello@qustomiq.ru",
      rights: "© 2026 QUSTOMIQ. All rights reserved.",
    },
  },
} as const;

export type Dict = typeof dict.ru;
