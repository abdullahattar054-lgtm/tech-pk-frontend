const ContactPage = () => {
    return (
        <div className="min-h-screen py-12 bg-gray-50 dark:bg-dark-light">
            <div className="container-custom max-w-4xl">
                <h1 className="text-display mb-8">Contact Us</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="card p-8">
                        <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                        <form className="space-y-4">
                            <input type="text" placeholder="Name" className="input-field" />
                            <input type="email" placeholder="Email" className="input-field" />
                            <textarea placeholder="Message" rows="5" className="input-field" />
                            <button type="submit" className="btn-primary w-full">
                                Send Message
                            </button>
                        </form>
                    </div>
                    <div className="card p-8">
                        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium mb-1">Email</h3>
                                <p className="text-gray-600 dark:text-gray-400">support@tech.pk</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-1">Phone</h3>
                                <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-1">Address</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    123 Tech Street<br />
                                    Silicon Valley, CA 94000
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
