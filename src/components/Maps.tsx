import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export type MapsComponentProps = {
  readonly center?: google.maps.LatLngLiteral;
  readonly zoom?: number;
} & React.ComponentPropsWithoutRef<'div'>;

const MapsComponent = ({
  center,
  children,
  className,
  zoom,
  ...rest
}: MapsComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    }
  }, [ref, center, zoom]);

  return (
    <div ref={ref} className={className} id='map' {...rest}>
      {children}
    </div>
  );
};

const render = (status: Status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  return <h3>{status} ...</h3>;
};

const Maps = () => {
  const [lat, setLat] = useState<number>(-34.397);
  const [lng, setLng] = useState<number>(150.644);
  useEffect(() => {
    if (navigator.geolocation) {
      const locatingToastId = toast.loading('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.dismiss(locatingToastId);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          toast.dismiss(locatingToastId);
          toast.error('Unable to retrieve your location');
        }
      );
    }
  }, []);
  const center = { lat, lng };
  const zoom = 4;
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY} render={render}>
      <MapsComponent center={center} zoom={zoom} className='h-full w-full' />
    </Wrapper>
  );
};

export default Maps;
