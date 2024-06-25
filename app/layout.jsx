import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
    title: 'Propulse | The Perfect Rental Marketplace',
    description: 'Find your dream rental  property',
    keywords: 'rental, find rentals, apartment, house, properties'
}

const layout = ({children}) => {
    return (
        <html lang='en'>
            <head>
                <script src="http://localhost:8097"></script>
            </head>
            <body>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    )
}

export default layout