import '@/assets/styles/globals.css';

export const metadata = {
    title: 'Propulse | The Perfect Rental Marketplace',
    description: 'Find your dream rental  property',
    keywords: 'rental, find rentals, apartment, house, properties'
}

const layout = ({children}) => {
    return (
        <html lang='en'>
            <body>
                <div>{children}</div>
            </body>
        </html>
    )
}

export default layout