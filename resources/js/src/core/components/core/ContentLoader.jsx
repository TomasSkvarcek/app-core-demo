import {useEffect, useState} from "react";

function ContentLoader({loading, delay = 400, dontDelayOnFirstLoad = true, fullscreen = false}) {
    const [show, setShow] = useState(false)
    const [firstRender, setFirstRender] = useState(dontDelayOnFirstLoad)

    useEffect(() => {
        if (delay > 0 && !firstRender) {
            const timer = setTimeout(() => setShow(loading), delay)

            return () => {
                clearTimeout(timer)
            }
        } else {
            setShow(loading)
            if (dontDelayOnFirstLoad) {
                const timer = setTimeout(() => setFirstRender(false), delay)

                return () => {
                    clearTimeout(timer)
                }
            }
        }
    }, [loading, delay])

    if (show) {
        return (
            <div className={fullscreen ? 'loading-overlay-fullscreen' : 'loading-overlay'}>
                <div className="loading-indicator-wrapper">
                    <div id="loading-indicator-part-1" className="loading-indicator"></div>
                    <div id="loading-indicator-part-2" className="loading-indicator"></div>
                    <div id="loading-indicator-part-3" className="loading-indicator"></div>
                    <div id="loading-indicator-part-4" className="loading-indicator"></div>
                    <div id="loading-indicator-part-5" className="loading-indicator"></div>
                    <div id="loading-indicator-part-6" className="loading-indicator"></div>
                </div>
            </div>
        )
    }
}

export default ContentLoader
