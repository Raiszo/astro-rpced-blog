export type DeployManifest = {
	version: 1;
	routes: Route[];
	computeResources?: ComputeResource[];
	imageSettings?: ImageSettings;
	framework: FrameworkMetadata;
};

type Route = {
  path: string;
  target: Target;
  fallback?: Target;
}

type Target = {
  kind: TargetKind;
  src?: string;
  cacheControl?: string;
}

enum TargetKind {
  Static = "Static",
  Compute = "Compute",
  ImageOptimization = "ImageOptimization"
}

type ComputeResource = {
  name: string;
  runtime: ComputeRuntime;
  entrypoint: string;
};

type ComputeRuntime = 'nodejs16.x' | 'nodejs18.x' | 'nodejs20.x';

type ImageSettings = {
  sizes: number[];
  domains: string[];
  remotePatterns: RemotePattern[];
  formats: ImageFormat[];
  minumumCacheTTL: number;
  dangerouslyAllowSVG: boolean;
};

type ImageFormat = 'image/avif' | 'image/webp' | 'image/png' | 'image/jpeg';

type FrameworkMetadata = {
  name: string;
  version: string;
}

type RemotePattern = {
  protocol?: 'http' | 'https';
  hostname: string;
  port?: string;
  pathname?: string;
}
