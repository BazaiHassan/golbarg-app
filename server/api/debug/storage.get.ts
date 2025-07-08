// server/api/debug/storage.get.ts
export default defineEventHandler(async (event) => {
    try {
        type StorageTestResult = {
            type: string
            status: string
            readable: boolean
            writable: boolean
            message: string
            path?: string
        }

        const results: {
            timestamp: string
            storageTests: StorageTestResult[]
            environment: {
                nodeEnv: string | undefined
                platform: string
                cwd: string
            }
            existingFiles?: any
        } = {
            timestamp: new Date().toISOString(),
            storageTests: [],
            environment: {
                nodeEnv: process.env.NODE_ENV,
                platform: process.platform,
                cwd: process.cwd()
            }
        }

        // Test different storage locations
        const storageTypes = [
            'assets:public:images',
            'assets:public',
            'data',
            'assets',
            'public'
        ]

        for (const storageType of storageTypes) {
            try {
                console.log(`[DEBUG] Testing storage: ${storageType}`)
                
                const storage = useStorage(storageType)
                const testKey = `test-${Date.now()}.txt`
                const testData = 'test-data'
                
                // Try to write test data
                await storage.setItem(testKey, testData)
                console.log(`[DEBUG] ✅ Write successful for ${storageType}`)
                
                // Try to read it back
                const retrievedData = await storage.getItem(testKey)
                console.log(`[DEBUG] ✅ Read successful for ${storageType}`)
                
                // Clean up
                await storage.removeItem(testKey)
                console.log(`[DEBUG] ✅ Cleanup successful for ${storageType}`)
                
                results.storageTests.push({
                    type: storageType,
                    status: 'success',
                    readable: true,
                    writable: true,
                    message: 'All operations successful'
                })
                
            } catch (error) {
                console.log(
                    `[DEBUG] ❌ Error with ${storageType}:`,
                    typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : error
                )
                
                results.storageTests.push({
                    type: storageType,
                    status: 'error',
                    readable: false,
                    writable: false,
                    message: typeof error === 'object' && error !== null && 'message' in error ? String((error as any).message) : String(error)
                })
            }
        }

        // Check filesystem availability
        try {
            const fs = await import('fs').catch(() => null)
            const path = await import('path').catch(() => null)
            
            if (fs && path) {
                const testDir = path.join(process.cwd(), 'public', 'uploads')
                const testFile = path.join(testDir, 'test.txt')
                
                // Create directory if it doesn't exist
                if (!fs.existsSync(testDir)) {
                    fs.mkdirSync(testDir, { recursive: true })
                }
                
                // Test write
                fs.writeFileSync(testFile, 'test')
                
                // Test read
                const data = fs.readFileSync(testFile, 'utf8')
                
                // Cleanup
                fs.unlinkSync(testFile)
                
                results.storageTests.push({
                    type: 'filesystem',
                    status: 'success',
                    readable: true,
                    writable: true,
                    message: 'Filesystem operations successful',
                    path: testDir
                })
            } else {
                results.storageTests.push({
                    type: 'filesystem',
                    status: 'error',
                    readable: false,
                    writable: false,
                    message: 'Filesystem modules not available'
                })
            }
        } catch (fsError) {
            results.storageTests.push({
                type: 'filesystem',
                status: 'error',
                readable: false,
                writable: false,
                message: typeof fsError === 'object' && fsError !== null && 'message' in fsError ? String((fsError as any).message) : String(fsError)
            })
        }

        // List existing files in data storage
        try {
            const dataStorage = useStorage('data')
            const keys = await dataStorage.getKeys('images:')
            
            results.existingFiles = {
                dataStorage: keys,
                count: keys.length
            }
        } catch (error) {
            results.existingFiles = {
                error: typeof error === 'object' && error !== null && 'message' in error ? String((error as any).message) : String(error)
            }
        }

        return results
        
    } catch (error) {
        console.error('[DEBUG] Storage debug error:', error)
        
        return {
            error: true,
            message: typeof error === 'object' && error !== null && 'message' in error ? String((error as any).message) : String(error),
            timestamp: new Date().toISOString()
        }
    }
})