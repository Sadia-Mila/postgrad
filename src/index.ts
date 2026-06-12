import { createServer } from 'node:http'
import { createApplication } from './app/index.js'

async function main() {
    try {
        const app = createApplication()

        const basePort = Number(process.env.PORT) || 8080

        async function start(port: number, attempts = 0) {
            const server = createServer(app)

            server.on('error', (err: any) => {
                if (err?.code === 'EADDRINUSE' && attempts < 5) {
                    console.warn(`Port ${port} in use, trying ${port + 1}...`)
                    void start(port + 1, attempts + 1)
                    return
                }
                console.error('Server error:', err)
                process.exit(1)
            })

            server.listen(port, () => {
                console.log(`Http server is running on PORT ${port}`)
            })
        }

        await start(basePort)
    } catch (error) {
        console.log(`Error starting http server`)
        throw error
    }
}

main()