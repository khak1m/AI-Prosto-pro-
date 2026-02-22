import { useState, ChangeEvent, FormEvent } from 'react';
import {
    Zap, TrendingUp, Shield, Clock, Database,
    CheckCircle2, Target, Calculator, Building2, ShoppingCart, Users, MessageSquare
} from 'lucide-react';

interface FormData {
    name: string;
    phone: string;
    channels: string[];
    crm: string;
}

export default function App() {
    // --- Состояние формы ---
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        channels: [],
        crm: '' 
    });

    // --- Состояние калькулятора ---
    const [calcLeads, setCalcLeads] = useState<number>(500); 
    const [calcCheck, setCalcCheck] = useState<number>(50000);
    const [calcConv, setCalcConv] = useState<number>(5); 

    // --- ЛОГИКА КАЛЬКУЛЯТОРА ---
    const currentRevenue = calcLeads * (calcConv / 100) * calcCheck;
    const relativeBoostMultiplier = 1.20; // +20% к текущей конверсии
    const newRevenue = currentRevenue * relativeBoostMultiplier;
    const extraRevenue = newRevenue - currentRevenue;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value);
    };

    // --- Обработчики ---
    const handleChannelChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            channels: prev.channels.includes(value)
                ? prev.channels.filter(item => item !== value)
                : [...prev.channels, value]
        }));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    };

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-[#F8FAFC] selection:bg-[#5B21B6] selection:text-white">

            {/* Navbar */}
            <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-[#0A0E1A]/90 backdrop-blur-xl border-b border-[#1F2937]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-2xl md:text-3xl tracking-tight text-[#F8FAFC]" style={{ fontFamily: 'Manrope, sans-serif' }}>AI Prosto</span>
                        </div>
                        <div className="hidden md:flex">
                            <a href="#contact" className="bg-[#5B21B6] hover:bg-[#4C1D95] text-white px-8 py-3 rounded-xl font-bold tracking-wide text-sm transition-all" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                Получить расчёт
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Block 1: HERO - Мобильная адаптация применена */}
            <section className="relative pt-32 pb-16 lg:pt-56 lg:pb-36 overflow-hidden" style={{
                background: '#0A0E1A',
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[1000px] h-[400px] md:h-[600px] pointer-events-none" style={{
                    background: 'radial-gradient(ellipse, rgba(139,92,246,0.25) 0%, rgba(91,33,182,0.15) 30%, transparent 70%)',
                    filter: 'blur(60px)'
                }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="mb-6 md:mb-10">
                        <span className="text-[10px] md:text-[11px] font-medium tracking-[0.14em] text-[#999999] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
                            ИИ-автоматизация для бизнеса
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-[58px] font-extrabold mb-6 md:mb-8 leading-[1.15] md:leading-[1.05] text-[#F2F2F2]" style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 800,
                        letterSpacing: '-0.02em'
                    }}>
                        Первый контакт решает всё.<br className="hidden md:block" />
                        Вы покупаете не ИИ —<br className="hidden md:block" />
                        вы покупаете <span style={{
                            background: 'linear-gradient(135deg, #a78bfa 0%, #ffffff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>скорость ответа</span>.
                    </h1>

                    <p className="text-base md:text-[18px] leading-[1.6] text-[#A1A1AA] max-w-[900px] w-full mx-auto mb-8 md:mb-10 px-2 md:px-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Ответ за минуты, квалификация и фиксация в CRM — заявки не теряются.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
                        {[
                            { icon: '💬', text: 'Telegram' },
                            { icon: '🌐', text: 'Сайт' },
                            { icon: '📞', text: 'Звонки' }
                        ].map((badge, i) => (
                            <div key={i} className="rounded-full text-[13px] md:text-[14px] flex items-center gap-2 backdrop-blur-sm" style={{
                                fontFamily: 'Inter, sans-serif',
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                padding: '6px 16px md:padding: 8px 24px'
                            }}>
                                <span>{badge.icon}</span>
                                <span>{badge.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 md:mt-14 flex justify-center w-full">
                        <a href="#contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-[12px] p-[2px] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 w-full sm:w-fit min-w-[280px]">
                            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#5B21B6_0%,#A78BFA_50%,#5B21B6_100%)]" />
                            <span className="relative inline-flex h-full w-full items-center justify-center rounded-[10px] bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-6 py-4 md:px-10 md:py-5 text-sm md:text-base font-bold uppercase tracking-wider text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#6D28D9] group-hover:to-[#8B5CF6] group-hover:shadow-[0_0_40px_rgba(139,92,246,0.7)]" style={{
                                fontFamily: 'Manrope, sans-serif',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 0 24px rgba(139,92,246,0.5)'
                            }}>
                                <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer -translate-x-full"></span>
                                <span className="relative z-10 flex items-center gap-2 text-center">
                                    ПОЛУЧИТЬ РАСЧЁТ ЗА 5 МИНУТ →
                                </span>
                            </span>
                        </a>
                    </div>

                    <div className="mt-16 inline-flex flex-col md:flex-row items-center justify-center rounded-[24px] px-6 py-6 md:py-10 md:px-12 w-full max-w-3xl" style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                        {[
                            { number: '24/7', label: 'Работа без перерывов' },
                            { number: '< 30 сек', label: 'Время первого ответа' },
                            { number: '+20%', label: 'Рост конверсии' }
                        ].map((stat, i) => (
                            <div key={i} className={`text-center px-4 md:px-10 py-6 md:py-0 w-full md:w-auto ${i !== 2 ? 'border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.08)] md:border-[rgba(255,255,255,0.12)]' : ''}`}>
                                <div className="text-4xl md:text-[44px] text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, letterSpacing: '-0.03em' }}>
                                    {stat.number}
                                </div>
                                <div className="text-[11px] md:text-[12px] text-[#A1A1AA] font-semibold uppercase tracking-[0.15em]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Block 2: PROBLEM */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-[#0A0E1A]">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight" style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
                            Знакомая ситуация?
                        </h2>
                        <p className="text-base md:text-lg text-[#A1A1AA] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Каждый упущенный клиент — это потерянная прибыль. Вот что происходит без автоматизации:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        {[
                            {
                                icon: Clock,
                                title: 'Клиенты уходят к конкурентам',
                                desc: 'Пока ваш менеджер спит или занят, клиент уже нашёл того, кто ответил быстрее.'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Реклама работает впустую',
                                desc: 'Вы платите за трафик, но 30-40% заявок теряются из-за медленной обработки.'
                            },
                            {
                                icon: Users,
                                title: 'Менеджеры тонут в рутине',
                                desc: 'Отвечать на одни и те же вопросы, вручную вносить данные в CRM — это выгорание.'
                            },
                            {
                                icon: Target,
                                title: 'Нет контроля качества',
                                desc: 'Кто-то забыл перезвонить, кто-то записал неправильный номер. Хаос вместо системы.'
                            }
                        ].map((problem, i) => (
                            <div key={i} className="group relative p-6 md:p-8 rounded-[24px] bg-white/[0.02] border border-white/[0.05] transition-all duration-500 hover:bg-white/[0.04] hover:border-red-500/30 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(239,68,68,0.15)] overflow-hidden backdrop-blur-sm">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-5 md:mb-6 border border-red-500/20 group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-500 shadow-[inset_0_0_12px_rgba(239,68,68,0.2)]">
                                        <problem.icon className="w-5 h-5 md:w-6 md:h-6 text-red-400 group-hover:text-red-300 transition-colors" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                        {problem.title}
                                    </h3>
                                    <p className="text-[#A1A1AA] leading-relaxed text-[14px] md:text-[15px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {problem.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Block 3: SOLUTION */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-[#0A0E1A]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight" style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
                            Решение: ИИ-ассистент AI Prosto
                        </h2>
                        <p className="text-base md:text-lg text-[#A1A1AA] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Автоматизируем первый контакт с клиентом. Вы получаете готовых лидов, а не холодные заявки.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            {
                                icon: Zap,
                                title: 'Мгновенный ответ 24/7',
                                desc: 'Клиент получает ответ за секунды. Даже ночью, в выходные, в праздники.'
                            },
                            {
                                icon: MessageSquare,
                                title: 'Квалификация лидов',
                                desc: 'Бот задаёт нужные вопросы и собирает данные по вашему сценарию.'
                            },
                            {
                                icon: Database,
                                title: 'Автозапись в CRM',
                                desc: 'Лид создаётся автоматически со всеми данными. Никакого ручного ввода.'
                            },
                            {
                                icon: Shield,
                                title: 'Передача менеджеру',
                                desc: 'Менеджер получает готового клиента с контекстом и следующими шагами.'
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group relative p-6 md:p-8 rounded-[24px] bg-white/[0.02] border border-white/[0.05] transition-all duration-500 hover:bg-white/[0.04] hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.2)] overflow-hidden backdrop-blur-sm">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-5 md:mb-6 border border-violet-500/20 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-500 shadow-[inset_0_0_12px_rgba(139,92,246,0.2)]">
                                        <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-violet-400 group-hover:text-violet-300 transition-colors" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-[#A1A1AA] leading-relaxed text-[14px] md:text-[15px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Block 4: CASES */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-[#0A0E1A]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-violet-900/5 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight" style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
                            Результаты клиентов
                        </h2>
                        <p className="text-base md:text-lg text-[#A1A1AA] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Реальные кейсы: как автоматизация меняет экономику отдела продаж
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                        {[
                            {
                                industry: 'Салон красоты',
                                icon: Building2,
                                metric: '+30% записей',
                                desc: 'Клиенты записываются сами через бота. Администратор освободился от рутины.'
                            },
                            {
                                industry: 'E-commerce',
                                icon: ShoppingCart,
                                metric: '24/7 поддержка',
                                desc: 'Ответы на вопросы о товарах и доставке в любое время. ROMI вырос в 1.5 раза.'
                            },
                            {
                                industry: 'Недвижимость',
                                icon: Target,
                                metric: '-40% времени',
                                desc: 'Квалификация до звонка. Менеджеры работают только с готовыми клиентами.'
                            }
                        ].map((c, i) => (
                            <div key={i} className="group relative flex flex-col p-6 md:p-8 lg:p-10 rounded-[24px] bg-white/[0.02] border border-white/[0.05] transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-1 overflow-hidden backdrop-blur-sm hover:border-violet-500/30 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.15)]">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="inline-flex items-center w-fit gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 md:mb-8 transition-colors duration-500 group-hover:border-violet-500/30 group-hover:bg-violet-500/10">
                                        <c.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-400 group-hover:text-violet-400 transition-colors duration-500" />
                                        <span className="text-[13px] md:text-sm font-bold text-zinc-300 group-hover:text-violet-200 transition-colors duration-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                                            {c.industry}
                                        </span>
                                    </div>
                                    <div className="text-[28px] lg:text-[32px] font-extrabold text-white mb-3 md:mb-4 leading-[1.2] tracking-tight whitespace-nowrap" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                        {c.metric}
                                    </div>
                                    <p className="text-[#A1A1AA] leading-relaxed text-[14px] md:text-[15px] mt-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {c.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Block 5: HOW IT WORKS */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-[#0A0E1A]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                        <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight" style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
                            Как проходит внедрение
                        </h2>
                        <p className="text-base md:text-lg text-[#A1A1AA] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Под ключ: от анализа до запуска за 2-3 недели
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
                        <div className="hidden md:block absolute top-[32px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent pointer-events-none"></div>
                        {[
                            {
                                step: '01',
                                title: 'Диагностика',
                                items: [
                                    'Анализируем ваш поток заявок',
                                    'Определяем точки потерь',
                                    'Составляем сценарий диалога'
                                ]
                            },
                            {
                                step: '02',
                                title: 'Интеграция',
                                items: [
                                    'Подключаем мессенджеры и CRM',
                                    'Настраиваем автоматизацию',
                                    'Тестируем на реальных кейсах'
                                ]
                            },
                            {
                                step: '03',
                                title: 'Запуск',
                                items: [
                                    'Обучаем вашу команду',
                                    'Запускаем в работу',
                                    'Контролируем первые недели'
                                ]
                            }
                        ].map((s, i) => (
                            <div key={i} className="relative z-10 group flex flex-col">
                                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-[#0A0E1A] rounded-full flex items-center justify-center mb-6 md:mb-8 border border-white/[0.08] group-hover:border-violet-500/50 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-500 relative z-10 shrink-0">
                                    <span className="text-lg md:text-xl font-extrabold bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                        {s.step}
                                    </span>
                                </div>
                                <div className="bg-white/[0.02] border border-white/[0.05] p-6 md:p-8 lg:p-10 rounded-[24px] backdrop-blur-sm transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-violet-500/30 group-hover:-translate-y-1 flex-1 flex flex-col relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl md:text-[22px] font-bold mb-6 md:mb-8 text-center text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.title}</h3>
                                        <ul className="space-y-4 md:space-y-5">
                                            {s.items.map((item, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-violet-400 shrink-0 mt-0.5" />
                                                    <span className="text-[#A1A1AA] text-[14px] md:text-[15px] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Block 6: CALCULATOR & CTA FORM */}
            <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-[#0A0E1A]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[700px] bg-violet-900/10 blur-[180px] rounded-full pointer-events-none"></div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    
                    {/* --- ЧАСТЬ 1: КАЛЬКУЛЯТОР --- */}
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight" style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
                            Посчитайте свою упущенную прибыль
                        </h2>
                        <p className="text-base md:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Задержка ответа даже на 15 минут убивает конверсию. Узнайте, сколько дополнительных денег вам принесет ИИ-ассистент.
                        </p>
                    </div>

                    <div className="bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[24px] md:rounded-[32px] border border-white/[0.05] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] mb-8 md:mb-12">
                        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                            <div className="space-y-8 md:space-y-10">
                                <div>
                                    <div className="flex justify-between items-end mb-3 md:mb-4">
                                        <label className="text-[12px] md:text-[14px] font-bold text-[#A1A1AA] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Входящие лиды (в месяц)</label>
                                        <span className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>{calcLeads}</span>
                                    </div>
                                    <input type="range" min="300" max="5000" step="50" value={calcLeads} onChange={(e) => setCalcLeads(Number(e.target.value))} 
                                        className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-violet-500" />
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-3 md:mb-4">
                                        <label className="text-[12px] md:text-[14px] font-bold text-[#A1A1AA] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Средний чек</label>
                                        <span className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>{formatCurrency(calcCheck)}</span>
                                    </div>
                                    <input type="range" min="5000" max="500000" step="5000" value={calcCheck} onChange={(e) => setCalcCheck(Number(e.target.value))} 
                                        className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-violet-500" />
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-3 md:mb-4">
                                        <label className="text-[12px] md:text-[14px] font-bold text-[#A1A1AA] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Текущая конверсия в продажу</label>
                                        <span className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>{calcConv}%</span>
                                    </div>
                                    <input type="range" min="1" max="30" step="1" value={calcConv} onChange={(e) => setCalcConv(Number(e.target.value))} 
                                        className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-violet-500" />
                                </div>
                            </div>

                            <div className="relative flex flex-col justify-center bg-gradient-to-br from-violet-900/20 to-fuchsia-900/10 border border-violet-500/20 rounded-[20px] md:rounded-[24px] p-6 md:p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                                
                                <div className="relative z-10 space-y-5 md:space-y-6">
                                    <div>
                                        <div className="text-[#A1A1AA] text-[13px] md:text-sm font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Выручка сейчас:</div>
                                        <div className="text-xl md:text-2xl font-semibold text-white/50 line-through" style={{ fontFamily: 'Manrope, sans-serif' }}>{formatCurrency(currentRevenue)}</div>
                                    </div>

                                    <div>
                                        <div className="text-violet-300 text-[11px] md:text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 md:gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                            <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                                            С быстрыми ответами (+20% конв.):
                                        </div>
                                        <div className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-none" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                            {formatCurrency(newRevenue)}
                                        </div>
                                    </div>

                                    <div className="pt-5 md:pt-6 border-t border-violet-500/20">
                                        <div className="inline-flex flex-col">
                                            <span className="text-[11px] md:text-[13px] font-bold text-fuchsia-400 uppercase tracking-wider mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Ваша дополнительная прибыль</span>
                                            <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-white to-fuchsia-200 bg-clip-text text-transparent" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                                + {formatCurrency(extraRevenue)} / мес
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- ЧАСТЬ 2: ФОРМА --- */}
                    <form onSubmit={handleSubmit} className="bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[24px] md:rounded-[32px] border border-white/[0.05] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] max-w-3xl mx-auto relative overflow-hidden">
                        
                        <div className="text-center mb-8 md:mb-10">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Заберите эти деньги в свой бизнес</h3>
                            <p className="text-[#A1A1AA] text-[13px] md:text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Оставьте телефон, и мы предложим решение для интеграции под вашу нишу.</p>
                        </div>

                        <div className="space-y-6 md:space-y-8 relative z-10">
                            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <label className="block text-[12px] md:text-[13px] font-bold text-[#A1A1AA] mb-2 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Имя</label>
                                    <input required name="name" value={formData.name} onChange={handleInputChange} type="text" 
                                        className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 md:px-5 md:py-4 text-white placeholder-[#64748B] focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-violet-500/20 transition-all text-sm md:text-base" 
                                        placeholder="Ваше имя" style={{ fontFamily: 'Inter, sans-serif' }} />
                                </div>
                                <div>
                                    <label className="block text-[12px] md:text-[13px] font-bold text-[#A1A1AA] mb-2 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Телефон</label>
                                    <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" 
                                        className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 md:px-5 md:py-4 text-white placeholder-[#64748B] focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-violet-500/20 transition-all text-sm md:text-base" 
                                        placeholder="+7 (999) 000-00-00" style={{ fontFamily: 'Inter, sans-serif' }} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[12px] md:text-[13px] font-bold text-[#A1A1AA] mb-3 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Где планируете отвечать клиентам?</label>
                                <div className="flex flex-wrap gap-2 md:gap-3">
                                    {['Telegram', 'WhatsApp', 'Сайт', 'Звонки', 'Avito'].map(cn => (
                                        <label key={cn} className="cursor-pointer relative group">
                                            <input type="checkbox" className="peer sr-only" checked={formData.channels.includes(cn)} onChange={() => handleChannelChange(cn)} />
                                            <div className="px-4 py-2.5 md:px-5 md:py-3 rounded-xl border border-white/[0.1] bg-white/[0.03] text-[#A1A1AA] group-hover:border-white/[0.2] peer-checked:bg-violet-600 peer-checked:text-white peer-checked:border-violet-600 transition-all font-medium text-[13px] md:text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                {cn}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[12px] md:text-[13px] font-bold text-[#A1A1AA] mb-3 uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>Какая у вас CRM?</label>
                                <div className="flex flex-wrap gap-2 md:gap-3">
                                    {['amoCRM', 'Bitrix24', 'Своя разработка', 'Пока нет'].map(crmOption => (
                                        <label key={crmOption} className="cursor-pointer relative group">
                                            <input type="radio" name="crm" value={crmOption} className="peer sr-only" checked={formData.crm === crmOption} onChange={(e) => setFormData(prev => ({...prev, crm: e.target.value}))} />
                                            <div className="px-4 py-2.5 md:px-5 md:py-3 rounded-xl border border-white/[0.1] bg-white/[0.03] text-[#A1A1AA] group-hover:border-white/[0.2] peer-checked:bg-[#0F172A] peer-checked:text-white peer-checked:border-violet-500 transition-all font-medium text-[13px] md:text-sm flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                <div className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border flex items-center justify-center transition-all shrink-0 ${formData.crm === crmOption ? 'border-violet-500' : 'border-white/[0.3] group-hover:border-violet-400'}`}>
                                                    {formData.crm === crmOption && <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-violet-500"></div>}
                                                </div>
                                                {crmOption}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] hover:from-[#6D28D9] hover:to-[#8B5CF6] p-1 rounded-[12px] transition-all duration-300 mt-6 md:mt-4 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] rounded-[12px] blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className="relative flex items-center justify-center gap-2 md:gap-3 w-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] h-full rounded-[10px] py-4 md:py-5 px-4 md:px-6 text-white font-bold text-[15px] md:text-lg uppercase tracking-wider text-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    <Calculator className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                                    Получить индивидуальный план
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 md:py-12 bg-[#0A0E1A] text-center relative z-10 border-t border-white/[0.05] px-4">
                <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
                    <span className="font-extrabold tracking-tight text-xl md:text-2xl bg-gradient-to-r from-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent" style={{ fontFamily: 'Manrope, sans-serif' }}>AI Prosto</span>
                </div>
                <p className="text-[#64748B] text-[12px] md:text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    © {new Date().getFullYear()} Все права защищены. Интеграция систем искусственного интеллекта.
                </p>
            </footer>
        </div>
    );
}

