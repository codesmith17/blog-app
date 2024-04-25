import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About Movie Blog
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to the Movie Blog! This blog is dedicated to providing
              insightful articles and reviews about movies from various genres
              and eras. Whether you're a casual moviegoer or a cinephile, you'll
              find something interesting to read here.
            </p>

            <p>
              Our team of writers is passionate about cinema and loves to share
              their thoughts and analyses on the latest releases, classic films,
              and everything in between. From Hollywood blockbusters to indie
              gems, we cover a wide range of topics to cater to diverse tastes.
            </p>

            <p>
              Dive into our blog to discover in-depth reviews, behind-the-scenes
              stories, director spotlights, and much more. Whether you're
              interested in exploring the artistry of filmmaking or simply
              looking for movie recommendations, we've got you covered.
            </p>

            <p>
              Feel free to leave comments on our posts and engage with fellow
              movie enthusiasts. Share your favorite films, discuss plot twists,
              or debate the merits of different genres. Let's celebrate the
              magic of cinema together!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
