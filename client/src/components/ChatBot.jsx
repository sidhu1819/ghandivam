import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Minimize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { t, language } = useLanguage();

  const botTranslations = {
    en: {
      welcome: "Hello! I'm your Ghandivam AI assistant. How can I help you today?",
      placeholder: "Type your question...",
      send: "Send",
      minimize: "Minimize",
      close: "Close",
      typing: "AI is typing...",
      defaultResponse: "I understand you're asking about that. Could you please rephrase your question? I can help you with information about projects, registration, login, profile, skills, and more!",
      noResponse: "I'm not sure about that. Try asking about: projects, registration, login, profile, skills, trust points, or collaboration tools."
    },
    es: {
      welcome: "¡Hola! Soy tu asistente de IA de Ghandivam. ¿Cómo puedo ayudarte hoy?",
      placeholder: "Escribe tu pregunta...",
      send: "Enviar",
      minimize: "Minimizar",
      close: "Cerrar",
      typing: "La IA está escribiendo...",
      defaultResponse: "Entiendo que estás preguntando sobre eso. ¿Podrías reformular tu pregunta? ¡Puedo ayudarte con información sobre proyectos, registro, inicio de sesión, perfil, habilidades y más!",
      noResponse: "No estoy seguro de eso. Intenta preguntar sobre: proyectos, registro, inicio de sesión, perfil, habilidades, puntos de confianza o herramientas de colaboración."
    },
    fr: {
      welcome: "Bonjour! Je suis votre assistant IA Ghandivam. Comment puis-je vous aider aujourd'hui?",
      placeholder: "Tapez votre question...",
      send: "Envoyer",
      minimize: "Réduire",
      close: "Fermer",
      typing: "L'IA tape...",
      defaultResponse: "Je comprends que vous posez une question à ce sujet. Pourriez-vous reformuler votre question? Je peux vous aider avec des informations sur les projets, l'inscription, la connexion, le profil, les compétences et plus encore!",
      noResponse: "Je ne suis pas sûr de cela. Essayez de demander sur: projets, inscription, connexion, profil, compétences, points de confiance ou outils de collaboration."
    },
    de: {
      welcome: "Hallo! Ich bin Ihr Ghandivam KI-Assistent. Wie kann ich Ihnen heute helfen?",
      placeholder: "Geben Sie Ihre Frage ein...",
      send: "Senden",
      minimize: "Minimieren",
      close: "Schließen",
      typing: "KI tippt...",
      defaultResponse: "Ich verstehe, dass Sie danach fragen. Könnten Sie Ihre Frage bitte umformulieren? Ich kann Ihnen mit Informationen über Projekte, Registrierung, Anmeldung, Profil, Fähigkeiten und mehr helfen!",
      noResponse: "Ich bin mir nicht sicher. Versuchen Sie zu fragen über: Projekte, Registrierung, Anmeldung, Profil, Fähigkeiten, Vertrauenspunkte oder Kollaborationstools."
    },
    zh: {
      welcome: "你好！我是您的 Ghandivam AI 助手。今天我能为您做些什么？",
      placeholder: "输入您的问题...",
      send: "发送",
      minimize: "最小化",
      close: "关闭",
      typing: "AI 正在输入...",
      defaultResponse: "我理解您的问题。您能否重新表述您的问题？我可以帮助您了解项目、注册、登录、个人资料、技能等信息！",
      noResponse: "我不太确定。尝试询问：项目、注册、登录、个人资料、技能、信任积分或协作工具。"
    },
    hi: {
      welcome: "नमस्ते! मैं आपका Ghandivam AI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
      placeholder: "अपना प्रश्न टाइप करें...",
      send: "भेजें",
      minimize: "छोटा करें",
      close: "बंद करें",
      typing: "AI टाइप कर रहा है...",
      defaultResponse: "मैं समझता हूं कि आप इसके बारे में पूछ रहे हैं। क्या आप कृपया अपना प्रश्न फिर से लिख सकते हैं? मैं आपकी परियोजनाओं, पंजीकरण, लॉगिन, प्रोफ़ाइल, कौशल और अधिक के बारे में जानकारी के साथ मदद कर सकता हूं!",
      noResponse: "मुझे इसके बारे में यकीन नहीं है। इनके बारे में पूछने का प्रयास करें: परियोजनाएं, पंजीकरण, लॉगिन, प्रोफ़ाइल, कौशल, ट्रस्ट पॉइंट्स, या सहयोग उपकरण।"
    }
  };

  const botT = botTranslations[language] || botTranslations.en;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage('bot', botT.welcome);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text, timestamp: new Date() }]);
  };

  const getAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase().trim();
    
    // Project related questions
    if (lowerQuestion.includes('project') || lowerQuestion.includes('proyecto') || lowerQuestion.includes('projet')) {
      if (lowerQuestion.includes('create') || lowerQuestion.includes('crear') || lowerQuestion.includes('créer')) {
        return language === 'en' ? "To create a project, go to 'My Projects' → 'Create Project'. You'll need to fill in basic info, required skills, timeline, and collaboration settings. The project leader is automatically assigned as you!" :
               language === 'es' ? "Para crear un proyecto, ve a 'Mis Proyectos' → 'Crear Proyecto'. Necesitarás completar información básica, habilidades requeridas, cronograma y configuración de colaboración. ¡El líder del proyecto se asigna automáticamente como tú!" :
               language === 'fr' ? "Pour créer un projet, allez dans 'Mes Projets' → 'Créer un Projet'. Vous devrez remplir les informations de base, les compétences requises, le calendrier et les paramètres de collaboration. Le chef de projet est automatiquement assigné comme vous!" :
               language === 'de' ? "Um ein Projekt zu erstellen, gehen Sie zu 'Meine Projekte' → 'Projekt Erstellen'. Sie müssen Grundinformationen, erforderliche Fähigkeiten, Zeitplan und Kollaborationseinstellungen ausfüllen. Der Projektleiter wird automatisch als Sie zugewiesen!" :
               language === 'zh' ? "要创建项目，请转到“我的项目”→“创建项目”。您需要填写基本信息、所需技能、时间线和协作设置。项目负责人会自动分配给您！" :
               "प्रोजेक्ट बनाने के लिए, 'मेरे प्रोजेक्ट' → 'प्रोजेक्ट बनाएं' पर जाएं। आपको मूल जानकारी, आवश्यक कौशल, समयरेखा और सहयोग सेटिंग्स भरनी होंगी। प्रोजेक्ट लीडर स्वचालित रूप से आपको असाइन किया जाता है!";
      }
      if (lowerQuestion.includes('join') || lowerQuestion.includes('unirse') || lowerQuestion.includes('rejoindre')) {
        return language === 'en' ? "To join a project, go to 'My Projects' → 'Join Project'. Browse available projects and click 'Apply to Join' on any project that interests you!" :
               language === 'es' ? "Para unirse a un proyecto, ve a 'Mis Proyectos' → 'Unirse a Proyecto'. ¡Explora proyectos disponibles y haz clic en 'Solicitar Unirse' en cualquier proyecto que te interese!" :
               language === 'fr' ? "Pour rejoindre un projet, allez dans 'Mes Projets' → 'Rejoindre un Projet'. Parcourez les projets disponibles et cliquez sur 'Postuler pour Rejoindre' sur tout projet qui vous intéresse!" :
               language === 'de' ? "Um einem Projekt beizutreten, gehen Sie zu 'Meine Projekte' → 'Projekt Beitreten'. Durchsuchen Sie verfügbare Projekte und klicken Sie auf 'Beitritt Beantragen' bei jedem Projekt, das Sie interessiert!" :
               language === 'zh' ? "要加入项目，请转到“我的项目”→“加入项目”。浏览可用项目，然后点击您感兴趣的任何项目上的“申请加入”！" :
               "प्रोजेक्ट में शामिल होने के लिए, 'मेरे प्रोजेक्ट' → 'प्रोजेक्ट में शामिल हों' पर जाएं। उपलब्ध प्रोजेक्ट ब्राउज़ करें और आपकी रुचि वाले किसी भी प्रोजेक्ट पर 'शामिल होने के लिए आवेदन करें' पर क्लिक करें!";
      }
      return language === 'en' ? "Projects are collaborative workspaces where teams work together. You can create your own project or join existing ones. Projects help you build skills, earn trust points, and collaborate with others!" :
             language === 'es' ? "Los proyectos son espacios de trabajo colaborativos donde los equipos trabajan juntos. Puedes crear tu propio proyecto o unirte a proyectos existentes. ¡Los proyectos te ayudan a desarrollar habilidades, ganar puntos de confianza y colaborar con otros!" :
             language === 'fr' ? "Les projets sont des espaces de travail collaboratifs où les équipes travaillent ensemble. Vous pouvez créer votre propre projet ou rejoindre des projets existants. Les projets vous aident à développer des compétences, à gagner des points de confiance et à collaborer avec d'autres!" :
             language === 'de' ? "Projekte sind kollaborative Arbeitsbereiche, in denen Teams zusammenarbeiten. Sie können Ihr eigenes Projekt erstellen oder bestehenden beitreten. Projekte helfen Ihnen, Fähigkeiten aufzubauen, Vertrauenspunkte zu verdienen und mit anderen zusammenzuarbeiten!" :
             language === 'zh' ? "项目是团队协作的工作空间。您可以创建自己的项目或加入现有项目。项目帮助您培养技能、获得信任积分并与他人协作！" :
             "प्रोजेक्ट सहयोगी कार्यक्षेत्र हैं जहां टीमें एक साथ काम करती हैं। आप अपना प्रोजेक्ट बना सकते हैं या मौजूदा प्रोजेक्ट में शामिल हो सकते हैं। प्रोजेक्ट आपको कौशल बनाने, ट्रस्ट पॉइंट्स अर्जित करने और दूसरों के साथ सहयोग करने में मदद करते हैं!";
    }

    // Registration/Login questions
    if (lowerQuestion.includes('register') || lowerQuestion.includes('sign up') || lowerQuestion.includes('account') || 
        lowerQuestion.includes('registr') || lowerQuestion.includes('cuenta') || lowerQuestion.includes('compte')) {
      return language === 'en' ? "To register, click 'Sign Up' on the login page. You'll need to provide your name, username, phone number, email, and password. After registration, you'll receive an OTP to verify your phone number." :
             language === 'es' ? "Para registrarse, haga clic en 'Registrarse' en la página de inicio de sesión. Necesitará proporcionar su nombre, nombre de usuario, número de teléfono, correo electrónico y contraseña. Después del registro, recibirá un OTP para verificar su número de teléfono." :
             language === 'fr' ? "Pour vous inscrire, cliquez sur 'S'inscrire' sur la page de connexion. Vous devrez fournir votre nom, nom d'utilisateur, numéro de téléphone, email et mot de passe. Après l'inscription, vous recevrez un OTP pour vérifier votre numéro de téléphone." :
             language === 'de' ? "Um sich zu registrieren, klicken Sie auf 'Registrieren' auf der Anmeldeseite. Sie müssen Ihren Namen, Benutzernamen, Telefonnummer, E-Mail und Passwort angeben. Nach der Registrierung erhalten Sie einen OTP zur Verifizierung Ihrer Telefonnummer." :
             language === 'zh' ? "要注册，请在登录页面上点击“注册”。您需要提供您的姓名、用户名、电话号码、电子邮件和密码。注册后，您将收到一个 OTP 来验证您的电话号码。" :
             "पंजीकरण करने के लिए, लॉगिन पेज पर 'साइन अप' पर क्लिक करें। आपको अपना नाम, उपयोगकर्ता नाम, फोन नंबर, ईमेल और पासवर्ड प्रदान करना होगा। पंजीकरण के बाद, आपको अपना फोन नंबर सत्यापित करने के लिए एक OTP प्राप्त होगा।";
    }

    if (lowerQuestion.includes('login') || lowerQuestion.includes('sign in') || lowerQuestion.includes('iniciar') || 
        lowerQuestion.includes('connexion') || lowerQuestion.includes('anmeldung')) {
      return language === 'en' ? "To login, go to the login page and enter your username/email/phone and password. If you forgot your password, click 'Forgot Password?' to reset it using OTP." :
             language === 'es' ? "Para iniciar sesión, vaya a la página de inicio de sesión e ingrese su nombre de usuario/correo/teléfono y contraseña. Si olvidó su contraseña, haga clic en '¿Olvidaste tu Contraseña?' para restablecerla usando OTP." :
             language === 'fr' ? "Pour vous connecter, allez sur la page de connexion et entrez votre nom d'utilisateur/email/téléphone et mot de passe. Si vous avez oublié votre mot de passe, cliquez sur 'Mot de Passe Oublié?' pour le réinitialiser en utilisant OTP." :
             language === 'de' ? "Um sich anzumelden, gehen Sie zur Anmeldeseite und geben Sie Ihren Benutzernamen/E-Mail/Telefon und Passwort ein. Wenn Sie Ihr Passwort vergessen haben, klicken Sie auf 'Passwort Vergessen?', um es mit OTP zurückzusetzen." :
             language === 'zh' ? "要登录，请转到登录页面并输入您的用户名/电子邮件/电话和密码。如果您忘记了密码，请点击“忘记密码？”使用 OTP 重置它。" :
             "लॉगिन करने के लिए, लॉगिन पेज पर जाएं और अपना उपयोगकर्ता नाम/ईमेल/फोन और पासवर्ड दर्ज करें। यदि आप अपना पासवर्ड भूल गए हैं, तो इसे OTP का उपयोग करके रीसेट करने के लिए 'पासवर्ड भूल गए?' पर क्लिक करें।";
    }

    // Trust Points questions
    if (lowerQuestion.includes('trust point') || lowerQuestion.includes('punto de confianza') || 
        lowerQuestion.includes('point de confiance') || lowerQuestion.includes('vertrauenspunkt')) {
      return language === 'en' ? "Trust Points are earned by completing projects, collaborating with team members, and receiving positive feedback. Higher trust points show your reliability and expertise in the community!" :
             language === 'es' ? "Los Puntos de Confianza se ganan completando proyectos, colaborando con miembros del equipo y recibiendo comentarios positivos. ¡Los puntos de confianza más altos muestran tu confiabilidad y experiencia en la comunidad!" :
             language === 'fr' ? "Les Points de Confiance sont gagnés en complétant des projets, en collaborant avec les membres de l'équipe et en recevant des commentaires positifs. Des points de confiance plus élevés montrent votre fiabilité et votre expertise dans la communauté!" :
             language === 'de' ? "Vertrauenspunkte werden durch das Abschließen von Projekten, die Zusammenarbeit mit Teammitgliedern und das Erhalten von positivem Feedback verdient. Höhere Vertrauenspunkte zeigen Ihre Zuverlässigkeit und Expertise in der Community!" :
             language === 'zh' ? "信任积分通过完成项目、与团队成员协作和获得积极反馈来获得。更高的信任积分显示您在社区中的可靠性和专业知识！" :
             "ट्रस्ट पॉइंट्स प्रोजेक्ट पूरा करने, टीम के सदस्यों के साथ सहयोग करने और सकारात्मक प्रतिक्रिया प्राप्त करने से अर्जित किए जाते हैं। उच्च ट्रस्ट पॉइंट्स समुदाय में आपकी विश्वसनीयता और विशेषज्ञता दिखाते हैं!";
    }

    // Skills questions
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('habilidad') || lowerQuestion.includes('compétence') || 
        lowerQuestion.includes('fähigkeit')) {
      return language === 'en' ? "Skills represent your expertise areas. You can add skills to your profile, and projects often require specific skills. Verified skills help you match with relevant projects!" :
             language === 'es' ? "Las habilidades representan tus áreas de experiencia. Puedes agregar habilidades a tu perfil, y los proyectos a menudo requieren habilidades específicas. ¡Las habilidades verificadas te ayudan a hacer coincidir con proyectos relevantes!" :
             language === 'fr' ? "Les compétences représentent vos domaines d'expertise. Vous pouvez ajouter des compétences à votre profil, et les projets nécessitent souvent des compétences spécifiques. Les compétences vérifiées vous aident à correspondre avec des projets pertinents!" :
             language === 'de' ? "Fähigkeiten repräsentieren Ihre Fachgebiete. Sie können Fähigkeiten zu Ihrem Profil hinzufügen, und Projekte erfordern oft spezifische Fähigkeiten. Verifizierte Fähigkeiten helfen Ihnen, mit relevanten Projekten übereinzustimmen!" :
             language === 'zh' ? "技能代表您的专业领域。您可以将技能添加到您的个人资料中，项目通常需要特定技能。经过验证的技能可帮助您匹配相关项目！" :
             "कौशल आपके विशेषज्ञता क्षेत्रों का प्रतिनिधित्व करते हैं। आप अपनी प्रोफ़ाइल में कौशल जोड़ सकते हैं, और प्रोजेक्ट अक्सर विशिष्ट कौशल की आवश्यकता होती है। सत्यापित कौशल आपको प्रासंगिक प्रोजेक्ट से मेल खाने में मदद करते हैं!";
    }

    // Profile questions
    if (lowerQuestion.includes('profile') || lowerQuestion.includes('perfil') || lowerQuestion.includes('profil')) {
      return language === 'en' ? "Your profile shows your name, username, trust points, skills, active projects, and connections. You can view it by clicking 'Profile' in the navigation menu." :
             language === 'es' ? "Tu perfil muestra tu nombre, nombre de usuario, puntos de confianza, habilidades, proyectos activos y conexiones. Puedes verlo haciendo clic en 'Perfil' en el menú de navegación." :
             language === 'fr' ? "Votre profil affiche votre nom, nom d'utilisateur, points de confiance, compétences, projets actifs et connexions. Vous pouvez le voir en cliquant sur 'Profil' dans le menu de navigation." :
             language === 'de' ? "Ihr Profil zeigt Ihren Namen, Benutzernamen, Vertrauenspunkte, Fähigkeiten, aktive Projekte und Verbindungen. Sie können es anzeigen, indem Sie auf 'Profil' im Navigationsmenü klicken." :
             language === 'zh' ? "您的个人资料显示您的姓名、用户名、信任积分、技能、活跃项目和连接。您可以通过点击导航菜单中的“个人资料”来查看它。" :
             "आपकी प्रोफ़ाइल आपका नाम, उपयोगकर्ता नाम, ट्रस्ट पॉइंट्स, कौशल, सक्रिय प्रोजेक्ट और कनेक्शन दिखाती है। आप इसे नेविगेशन मेनू में 'प्रोफ़ाइल' पर क्लिक करके देख सकते हैं।";
    }

    // Collaboration/Video Call questions
    if (lowerQuestion.includes('video call') || lowerQuestion.includes('videollamada') || lowerQuestion.includes('appel vidéo') || 
        lowerQuestion.includes('videoanruf') || lowerQuestion.includes('collaboration') || lowerQuestion.includes('colaboración')) {
      return language === 'en' ? "In Ongoing Projects, you can use video calls with real-time AI subtitles in multiple languages. The chat feature allows team members to communicate and collaborate effectively!" :
             language === 'es' ? "En Proyectos en Curso, puedes usar videollamadas con subtítulos de IA en tiempo real en múltiples idiomas. ¡La función de chat permite a los miembros del equipo comunicarse y colaborar de manera efectiva!" :
             language === 'fr' ? "Dans les Projets en Cours, vous pouvez utiliser des appels vidéo avec des sous-titres IA en temps réel en plusieurs langues. La fonction de chat permet aux membres de l'équipe de communiquer et de collaborer efficacement!" :
             language === 'de' ? "In Laufenden Projekten können Sie Videoanrufe mit Echtzeit-KI-Untertiteln in mehreren Sprachen verwenden. Die Chat-Funktion ermöglicht es Teammitgliedern, effektiv zu kommunizieren und zusammenzuarbeiten!" :
             language === 'zh' ? "在进行中的项目中，您可以使用具有多语言实时 AI 字幕的视频通话。聊天功能允许团队成员有效沟通和协作！" :
             "चल रहे प्रोजेक्ट में, आप कई भाषाओं में रीयल-टाइम AI उपशीर्षक के साथ वीडियो कॉल का उपयोग कर सकते हैं। चैट सुविधा टीम के सदस्यों को प्रभावी ढंग से संवाद करने और सहयोग करने की अनुमति देती है!";
    }

    // General help
    if (lowerQuestion.includes('help') || lowerQuestion.includes('ayuda') || lowerQuestion.includes('aide') || 
        lowerQuestion.includes('hilfe') || lowerQuestion.includes('帮助') || lowerQuestion.includes('मदद')) {
      return language === 'en' ? "I can help you with: Creating/joining projects, Registration/Login, Trust Points, Skills, Profile management, Collaboration tools, and more! What would you like to know?" :
             language === 'es' ? "Puedo ayudarte con: Crear/unirse a proyectos, Registro/Inicio de sesión, Puntos de Confianza, Habilidades, Gestión de perfil, Herramientas de colaboración y más! ¿Qué te gustaría saber?" :
             language === 'fr' ? "Je peux vous aider avec: Créer/rejoindre des projets, Inscription/Connexion, Points de Confiance, Compétences, Gestion de profil, Outils de collaboration et plus encore! Que souhaitez-vous savoir?" :
             language === 'de' ? "Ich kann Ihnen helfen bei: Projekte erstellen/beitreten, Registrierung/Anmeldung, Vertrauenspunkte, Fähigkeiten, Profilverwaltung, Kollaborationstools und mehr! Was möchten Sie wissen?" :
             language === 'zh' ? "我可以帮助您：创建/加入项目、注册/登录、信任积分、技能、个人资料管理、协作工具等！您想了解什么？" :
             "मैं आपकी मदद कर सकता हूं: प्रोजेक्ट बनाना/शामिल होना, पंजीकरण/लॉगिन, ट्रस्ट पॉइंट्स, कौशल, प्रोफ़ाइल प्रबंधन, सहयोग उपकरण और अधिक! आप क्या जानना चाहेंगे?";
    }

    // Greetings
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hola') || 
        lowerQuestion.includes('bonjour') || lowerQuestion.includes('hallo') || lowerQuestion.includes('你好') || 
        lowerQuestion.includes('नमस्ते') || lowerQuestion.includes('hey')) {
      return botT.welcome;
    }

    // Default response
    return botT.defaultResponse;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage('user', userMessage);

    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setIsTyping(false);
      addMessage('bot', response);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 floating"
        title="Open AI Assistant"
      >
        <MessageCircle size={28} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-14' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-200 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Ghandivam AI Assistant</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:bg-white/20 rounded-full p-1 transition"
              title={botT.minimize}
            >
              <Minimize2 size={18} />
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsMinimized(false);
                setMessages([]);
              }}
              className="hover:bg-white/20 rounded-full p-1 transition"
              title={botT.close}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                    <p className="text-sm text-gray-500 italic">{botT.typing}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={botT.placeholder}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Send size={18} />
                  <span className="hidden sm:inline">{botT.send}</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;

