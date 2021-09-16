import React from 'react'
import { useSelector } from 'react-redux'
import './Showreel.scss'

const AWS_URL = 'https://malakhov-xlfood.s3.eu-central-1.amazonaws.com/'

const Showreel = () => {
  const { content, isLoaded } = useSelector(({ showreel }) => showreel)

  return (
    <section className="showreel">
      <div className="showreel__block">
        {isLoaded && content.uploadedVideo ? (
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
          isLoaded && (
            <img
              className="showreel__image"
              src={`${AWS_URL}${content.uploadedImage.path}`}
              alt={content.alt}
            />
          )
        )}
      </div>
    </section>
  )
}

export default Showreel
