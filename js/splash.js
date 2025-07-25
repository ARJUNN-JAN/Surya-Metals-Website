// Splash Screen Controller
class SplashScreen {
    constructor() {
        this.video = document.getElementById('logo-video');
        this.splashContainer = document.getElementById('splash-container');
        this.loadingIndicator = document.getElementById('loading-indicator');
        this.skipBtn = document.getElementById('skip-btn');
        this.progressBar = document.getElementById('progress-bar');
        
        this.videoLoaded = false;
        this.minSplashTime = 2000; // Minimum 2 seconds display time
        this.startTime = Date.now();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.preloadVideo();
        this.showLoadingProgress();
    }

    setupEventListeners() {
        // Video events
        this.video.addEventListener('loadeddata', () => this.onVideoLoaded());
        this.video.addEventListener('ended', () => this.onVideoEnded());
        this.video.addEventListener('error', () => this.onVideoError());
        this.video.addEventListener('timeupdate', () => this.updateProgress());

        // Skip button
        this.skipBtn.addEventListener('click', () => this.skipToWebsite());

        // Prevent right-click on video
        this.video.addEventListener('contextmenu', (e) => e.preventDefault());

        // Handle page visibility (pause video when tab is hidden)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.video.pause();
            } else if (this.videoLoaded) {
                this.video.play();
            }
        });
    }

    preloadVideo() {
        // Start loading the video
        this.video.load();
        
        // Fallback: If video doesn't load within 5 seconds, skip to website
        setTimeout(() => {
            if (!this.videoLoaded) {
                console.warn('Video loading timeout, proceeding to website');
                this.proceedToWebsite();
            }
        }, 5000);
    }

    onVideoLoaded() {
        this.videoLoaded = true;
        console.log('Video loaded successfully');
        
        // Hide loading indicator
        this.loadingIndicator.classList.add('hidden');
        
        // Show video with fade in effect
        this.video.classList.add('loaded');
        
        // Play video
        this.playVideo();
    }

    async playVideo() {
        try {
            await this.video.play();
            console.log('Video playing');
        } catch (error) {
            console.error('Error playing video:', error);
            // If autoplay fails, proceed to website after minimum time
            setTimeout(() => this.proceedToWebsite(), this.minSplashTime);
        }
    }

    onVideoEnded() {
        console.log('Video ended');
        this.proceedToWebsite();
    }

    onVideoError() {
        console.error('Video failed to load');
        // If video fails, proceed to website after minimum time
        const elapsed = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minSplashTime - elapsed);
        
        setTimeout(() => this.proceedToWebsite(), remainingTime);
    }

    updateProgress() {
        if (this.video.duration) {
            const progress = (this.video.currentTime / this.video.duration) * 100;
            this.progressBar.style.width = `${progress}%`;
        }
    }

    showLoadingProgress() {
        // Simulate loading progress while video loads
        let progress = 0;
        const interval = setInterval(() => {
            if (this.videoLoaded) {
                clearInterval(interval);
                return;
            }
            
            progress += Math.random() * 10;
            if (progress > 90) progress = 90; // Don't complete until video is ready
            
            this.progressBar.style.width = `${progress}%`;
        }, 200);
    }

    skipToWebsite() {
        console.log('User skipped intro');
        this.proceedToWebsite();
    }

    proceedToWebsite() {
        // Ensure minimum splash time has elapsed
        const elapsed = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minSplashTime - elapsed);
        
        setTimeout(() => {
            this.fadeOutAndRedirect();
        }, remainingTime);
    }

    fadeOutAndRedirect() {
        // Complete progress bar
        this.progressBar.style.width = '100%';
        
        // Fade out splash screen
        this.splashContainer.classList.add('fade-out');
        
        // Redirect to main website after fade completes
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 800);
    }
}

// Initialize splash screen when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SplashScreen();
});

// Preload main website resources
window.addEventListener('load', () => {
    // Preload critical resources for main website
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'main.html';
    document.head.appendChild(link);
    
    // Preload main CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'prefetch';
    cssLink.href = 'css/style.css';
    document.head.appendChild(cssLink);
});
