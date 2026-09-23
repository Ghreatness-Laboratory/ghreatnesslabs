import './globals.css';import {Header,Footer,Chatbot} from '@/components/Site';
export const metadata={title:'TASOL Marine Services',description:'Marine, energy and technical services'};export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/><main>{children}</main><Footer/><Chatbot/></body></html>}
