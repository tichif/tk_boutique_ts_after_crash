import Image from 'next/image';

const imagePath = process.env.NEXT_PUBLIC_LOGO_ADDRESS || '';

const ImageComponent = ({ value, width, height, alt }) => {
  return (
    <Image
      src={value}
      width={width}
      height={height}
      alt={alt}
      priority={true}
    />
  );
};

ImageComponent.defaultProps = {
  value: imagePath,
  width: 200,
  height: 200,
  alt: 'TK Boutique',
};

export default Component;
