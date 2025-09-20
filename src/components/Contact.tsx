import { Mail, MessageCircle, Phone } from 'lucide-react';

interface ContactProps {
    email: string;
    phone: string;
}

export default function Contact({ email, phone }: ContactProps) {
    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-8 font-oswald">Get In Touch</h2>
                <p className="text-lg text-gray-300 mb-8 font-rajdhani">
                    I'm always interested in new opportunities and exciting projects.
                </p>

                {/* Direct Contact Information */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8 mb-8 max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-white mb-6 font-oswald">Direct Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-400 transition-colors duration-300 flex-shrink-0">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-400 text-sm font-rajdhani mb-1">Email Address</p>
                                <a
                                    href={`mailto:${email}`}
                                    className="text-white font-semibold font-rajdhani hover:text-green-400 transition-colors duration-300 break-all"
                                >
                                    {email}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-400 transition-colors duration-300 flex-shrink-0">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-400 text-sm font-rajdhani mb-1">Phone Number</p>
                                <a
                                    href={`tel:${phone}`}
                                    className="text-white font-semibold font-rajdhani hover:text-blue-400 transition-colors duration-300"
                                >
                                    {phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mb-8">
                    <img
                        src="/icons/menu-panel-seperator.svg"
                        alt="separator"
                        className="w-32 h-8 opacity-60"
                    />
                </div>

                <a
                    href={`mailto:${email}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-green-600/20 inline-flex items-center space-x-2 font-rajdhani mb-8"
                >
                    <Mail className="w-5 h-5" />
                    <span>Send me an email</span>
                </a>

                <div className="flex justify-center mb-8">
                    <img
                        src="/icons/menu-panel-seperator.svg"
                        alt="separator"
                        className="w-32 h-8 opacity-60"
                    />
                </div>

                <div className="flex justify-center space-x-6">
                    <a
                        href={`https://wa.me/${phone.replace(/[^\d]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/20 group"
                    >
                        <div className="flex flex-col items-center space-y-3">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-400 transition-colors duration-300">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-white font-rajdhani text-sm font-semibold">WhatsApp</span>
                        </div>
                    </a>

                    <a
                        href={`sms:${phone}`}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-400/20 group"
                    >
                        <div className="flex flex-col items-center space-y-3">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-400 transition-colors duration-300">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-white font-rajdhani text-sm font-semibold">SMS</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
