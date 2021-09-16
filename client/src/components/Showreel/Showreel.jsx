import React, { useState, useEffect } from 'react'
import './Showreel.scss'

const AWS_URL = 'https://malakhov-xlfood.s3.eu-central-1.amazonaws.com/'

const Showreel = () => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    fetch('/api/showreel')
      .then(response => response.json())
      .then(data => setContent(data))
  }, [])

  return (
    <section className="showreel">
      <div className="showreel__block">
        {content && content.uploadedVideo ? (
          <video
            poster={`${AWS_URL}${content.uploadedImage.path}`}
            className="showreel__video"
            autoPlay
            muted
            loop
            playsInline
            load="lazy">
            {content.uploadedVideo.path.map((videoPath, index) => (
              <source
                key={videoPath}
                src={`${AWS_URL}${videoPath}`}
                type={content.uploadedVideo.mime[index]}
              />
            ))}
          </video>
        ) : (
          <img
            className="showreel__image"
            src={content && `${AWS_URL}${content.uploadedImage.path}`}
            alt={content && content.alt}
          />
        )}
      </div>
    </section>
  )
}

export default Showreel
