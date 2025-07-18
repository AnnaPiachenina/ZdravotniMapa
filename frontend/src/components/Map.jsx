import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function Map({ points, onSelectPoint }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const sourceRef = useRef(null);

  const generateGeoJSON = (points) => ({
    type: 'FeatureCollection',
    features: points.map(p => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [p.lng, p.lat],
      },
      properties: p,
    })),
  });

  useEffect(() => {
    
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [16.9, 49.30],
      zoom: 9,
    });

    mapInstanceRef.current = map;

    map.on('load', () => {
      const geojson = generateGeoJSON(points);

      map.addSource('points', {
        type: 'geojson',
        data: geojson,
        clusterMaxZoom: 10,
        clusterRadius: 20
      });

      sourceRef.current = map.getSource('points');

      map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-radius': 12,
          'circle-color': [
            'match',
            ['get', 'status'],
            'active', '#22c55e',
            'inactive', '#ef4444',
            '#9ca3af'
          ],
        },
      });

      map.on('click', 'points-layer', (e) => {
        const props = e.features[0].properties;
        onSelectPoint(props);
      });

      map.on('mouseenter', 'points-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'points-layer', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (sourceRef.current) {
      const geojson = generateGeoJSON(points);
      sourceRef.current.setData(geojson);
    }
  }, [points]);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
}

export default Map;
