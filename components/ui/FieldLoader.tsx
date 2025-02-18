import ContentLoader, { Rect } from 'react-content-loader/native';

type Props = {
  speed?: number;
  width?: number;
  height?: number;
  borderRadius?: number;
};

export default function FieldLoader({
  speed = 1,
  width = 100,
  height = 36,
  borderRadius = 8,
}: Props) {
  return (
    <ContentLoader
      style={{ flexDirection: 'row', alignItems: 'center' }}
      speed={speed}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor='#f3f3f3'
      foregroundColor='#fff'
    >
      <Rect
        x='0'
        y='0'
        rx={`${borderRadius}`}
        ry={`${borderRadius}`}
        width={width}
        height={height}
      />
    </ContentLoader>
  );
}
