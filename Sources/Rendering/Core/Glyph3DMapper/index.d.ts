import vtkMapper from "vtk.js/Sources/Rendering/Core/Mapper";

export enum OrientationModes {
	DIRECTION,
	ROTATION,
	MATRIX,
}

export enum ScaleModes {
	SCALE_BY_CONSTANT,
	SCALE_BY_MAGNITUDE,
	SCALE_BY_COMPONENTS,
}

interface IPrimitiveCount {

	/**
	 * 
	 */
	points: number;

	/**
	 * 
	 */
	verts: number;

	/**
	 * 
	 */
	lines: number;

	/**
	 * 
	 */
	triangles: number;
}

/**
 * 
 */
interface IGlyph3DMapperInitialValues {
	orient?: boolean,
	orientationMode?: OrientationModes,
	orientationArray?: number[],
	scaling?: boolean,
	scaleFactor?: number,
	scaleMode?: ScaleModes,
	scaleArray?: number[],
	matrixArray?: number[],
	normalArray?: number[],
	colorArray?: number[],
}

export interface vtkGlyph3DMapper extends vtkMapper {

	/**
	 * An orientation array is a vtkDataArray with 3 components. The first
	 * component is the angle of rotation along the X axis. The second
	 * component is the angle of rotation along the Y axis. The third
	 * component is the angle of rotation along the Z axis. Orientation is
	 * specified in X,Y,Z order but the rotations are performed in Z,X an Y.
	 * This definition is compliant with SetOrientation method on vtkProp3D.
	 * By using vector or normal there is a degree of freedom or rotation
	 * left (underconstrained). With the orientation array, there is no degree of
	 * freedom left.
	 */
	getOrientationMode(): OrientationModes;

	/**
	 * Get orientation as string
	 */
	getOrientationModeAsString(): string;

	/**
	 * Get orientation as array
	 */
	getOrientationArrayData(): number[];

	/**
	 * 
	 */
	getScaleFactor(): number;

	/**
	 * Get scale mode
	 * @default SCALE_BY_MAGNITUDE
	 */
	getScaleMode(): ScaleModes;

	/**
	 * Get scale mode as string
	 */
	getScaleModeAsString(): string;

	/**
	 * Get scale mode as array
	 */
	getScaleArrayData(): number[];

	/**
	 * Get the bounds for this mapper as [Xmin,Xmax,Ymin,Ymax,Zmin,Zmax].
	 * @returns 
	 */
	getBounds(): number[];

	/**
	 * 
	 */
	buildArrays(): void;

	/**
	 * 
	 */
	getPrimitiveCount(): IPrimitiveCount;

	/**
	 * Orientation mode indicates if the OrientationArray provides the direction 
	 * vector for the orientation or the rotations around each axes.
	 */
	setOrientationMode(orientationMode: OrientationModes): boolean;

	/**
	 * 
	 */
	setOrientationModeToDirection(): boolean;

	/**
	 * 
	 */
	setOrientationModeToRotation(): boolean;

	/**
	 * 
	 */
	setOrientationModeToMatrix(): boolean;

	/**
	 * 
	 * @param scaleFactor 
	 */
	setScaleFactor(scaleFactor: number): boolean;

	/**
	 * Either scale by individual components (SCALE_BY_COMPONENTS) or magnitude (SCALE_BY_MAGNITUDE) of the chosen array to SCALE with or disable scaling using data array all together (SCALE_BY_MAGNITUDE).
	 * @param ScaleMode 
	 * @default SCALE_BY_MAGNITUDE
	 */
	setScaleMode(ScaleMode: ScaleModes): boolean;

	/**
	 * Set scale to SCALE_BY_MAGNITUDE
	 */
	setScaleModeToScaleByMagnitude(): boolean;

	/**
	 * Set scale to SCALE_BY_CONSTANT
	 */
	setScaleModeToScaleByComponents(): boolean;

	/**
	 * Set scale to SCALE_BY_CONSTANT
	 */
	setScaleModeToScaleByConstant(): boolean;
}

/**
 * Method use to decorate a given object (publicAPI+model) with vtkGlyph3DMapper characteristics.
 *
 * @param publicAPI object on which methods will be bounds (public)
 * @param model object on which data structure will be bounds (protected)
 * @param initialValues (default: {})
 */
export function extend(publicAPI: object, model: object, initialValues?: IGlyph3DMapperInitialValues): void;

/**
 * Method use to create a new instance of vtkGlyph3DMapper
 * @param initialValues for pre-setting some of its content
 */
export function newInstance(initialValues?: IGlyph3DMapperInitialValues): vtkGlyph3DMapper;

export declare const vtkGlyph3DMapper: {
	newInstance: typeof newInstance;
	extend: typeof extend;
}
export default vtkGlyph3DMapper;
