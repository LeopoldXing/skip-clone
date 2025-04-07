import hero from "../assets/hero.png";

const Hero = () => {
  return (
      <section>
        <img
            src={hero}
            className="w-full max-h-[600px] object-cover"
            alt="Online delivery service hero image showcasing a variety of food, groceries, and alcohol"
        />
      </section>
  );
};

export default Hero;
