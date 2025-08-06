import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }]);

      if (error) {
        throw error;
      }

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      });

      if (emailError) {
        console.error('Error sending email notification:', emailError);
        // Don't throw error here - the message was saved successfully
      }

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'benedictchinaza765@gmail.com',
      link: 'mailto:benedictchinaza765@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+2347026150575',
      link: 'tel:+2347026150575'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Nigeria',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-16 xs:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="container mx-auto">
        <div className="text-center mb-12 xs:mb-16 animate-fade-in">
          <h2 className="font-poppins text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-2 xs:px-0">
            Get In Touch
          </h2>
          <p className="font-inter text-base xs:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 xs:px-0">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 xs:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 xs:space-y-8 animate-fade-in">
            <div>
              <h3 className="font-poppins text-xl xs:text-2xl font-semibold text-foreground mb-4 xs:mb-6 text-center lg:text-left">
                Let's Start a Conversation
              </h3>
              <p className="font-inter text-sm xs:text-base text-muted-foreground leading-relaxed px-2 xs:px-0">
                I'm always excited to take on new challenges and collaborate with amazing people. 
                Whether you have a project in mind or just want to chat about technology, 
                feel free to reach out!
              </p>
            </div>

            <div className="space-y-3 xs:space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center space-x-3 xs:space-x-4 p-3 xs:p-4 bg-card/50 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-orange group"
                >
                  <div className="flex-shrink-0 w-10 h-10 xs:w-12 xs:h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all duration-300 [&>svg]:w-5 [&>svg]:h-5 xs:[&>svg]:w-6 xs:[&>svg]:h-6">
                    {info.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-poppins font-medium text-sm xs:text-base text-foreground group-hover:text-primary transition-colors duration-300">
                      {info.title}
                    </div>
                    <div className="font-inter text-xs xs:text-sm text-muted-foreground break-words">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card/50 border-border backdrop-blur-sm animate-slide-up">
            <CardContent className="p-6 xs:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-border focus:border-primary transition-colors duration-300 h-10 xs:h-11"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-border focus:border-primary transition-colors duration-300 h-10 xs:h-11"
                    />
                  </div>
                </div>

                <div>
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-primary transition-colors duration-300 h-10 xs:h-11"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-background/50 border-border focus:border-primary transition-colors duration-300 resize-none min-h-[120px] xs:min-h-[140px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full group h-11 xs:h-12"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 xs:w-5 h-4 xs:h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;