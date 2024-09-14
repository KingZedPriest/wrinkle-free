const loading = () => {
    return (
        <main className="h-dvh flex items-center justify-center">
            <div className="terminal-loader">
                <div className="terminal-header">
                    <div className="terminal-title">Status</div>
                    <div className="terminal-controls">
                        <div className="control close"></div>
                        <div className="control minimize"></div>
                        <div className="control maximize"></div>
                    </div>
                </div>
                <div className="text">Loading...</div>
            </div>
        </main>
    );
}

export default loading;

