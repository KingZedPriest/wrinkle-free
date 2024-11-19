'use client'

import { useState, useEffect } from 'react';

//Components
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Steps, Step } from './Steps';

export default function PWAInstaller() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [showPrompt, setShowPrompt] = useState(false)
    const [platform, setPlatform] = useState<'windows' | 'android' | 'mac' | 'ios' | 'unknown'>('unknown')

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowPrompt(true)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

        // Detect platform
        const userAgent = window.navigator.userAgent.toLowerCase()
        if (userAgent.includes('win')) setPlatform('windows')
        else if (userAgent.includes('android')) setPlatform('android')
        else if (userAgent.includes('mac')) setPlatform('mac')
        else if (userAgent.includes('iphone') || userAgent.includes('ipad')) setPlatform('ios')

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        }
    }, [])

    const handleInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt')
                } else {
                    console.log('User dismissed the install prompt')
                }
                setDeferredPrompt(null)
            })
        }
        setShowPrompt(false)
    }

    const renderInstructions = () => {
        switch (platform) {
            case 'windows':
            case 'android':
                return (
                    <DialogDescription>
                        Click the install button below to add this app to your device.
                    </DialogDescription>
                )
            case 'mac':
                return (
                    <Steps>
                        <Step>Click on the share button in the address bar</Step>
                        <Step>Select &quot;Add to Dock&quot; from the dropdown menu</Step>
                    </Steps>
                )
            case 'ios':
                return (
                    <Steps>
                        <Step>Tap the share button at the bottom of the screen</Step>
                        <Step>Scroll down and tap &quot;Add to Home Screen&quot;</Step>
                        <Step>Tap &quot;Add&quot; in the top right corner</Step>
                    </Steps>
                )
            default:
                return (
                    <DialogDescription>
                        Installation instructions are not available for your device.
                    </DialogDescription>
                )
        }
    }

    if (!showPrompt) return null

    return (
        <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Install Our App</DialogTitle>
                </DialogHeader>
                {renderInstructions()}
                <DialogFooter className='flex gap-5'>
                    {(platform === 'windows' || platform === 'android') && (
                        <Button onClick={handleInstall}>Install</Button>
                    )}
                    <Button variant="secondary" onClick={() => setShowPrompt(false)}>
                        Maybe Later
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}