import '../assets/styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
    title: 'Propulse | The Perfect Rental Marketplace',
    description: 'Find your dream rental  property',
    keywords: 'rental, find rentals, apartment, house, properties'
}

const layout = ({children}) => {
    return (
        <html lang='en'>
            <head>
            </head>
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer/>
            </body>
        </html>
    )
}

export default layout