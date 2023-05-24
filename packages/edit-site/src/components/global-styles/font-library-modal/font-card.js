/**
 * WordPress dependencies
 */
import { __, _n } from "@wordpress/i18n";
import {
    Card,
    CardBody,
    __experimentalText as Text,
    __experimentalHeading as Heading,
    __experimentalVStack as VStack,
    __experimentalHStack as HStack,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import FontFaceDemo from "./font-demo";



function FontCard ( { font, onClick, actionHandler, elevation } ) {

    const fakeFontFace = {
        fontStyle: 'normal',
        fontWeight: '400',
        fontFamily: font.fontFamily,
        fake: true,
    };

    const displayFontFace = (font.fontFace && font.fontFace.length)
        ? font?.fontFace?.find( face => face.fontStyle === 'normal' && face.fontWeight === '400') || font.fontFace[0]
        : fakeFontFace;

    const variantsCount = font.fontFace?.length || 1;

    const style = {
        cursor: !!onClick ? 'pointer' : 'default',
    };
    
    return (
        <div onClick={ onClick } style={ style } className="font-library-modal__font-card">
            <Card
                elevation={ elevation }
            >
                <CardBody>
                    <VStack spacing={4}>
                        <HStack justify="space-between">
                            <VStack spacing={1}>
                                <Text className="font-library-modal__font-card__name">{ font.name }</Text>
                                <Text className="font-library-modal__font-card__count">{variantsCount} { _n( "variant", "variants", variantsCount ) }</Text>
                            </VStack>
                            { !!actionHandler && (actionHandler) }
                        </HStack>
                        <FontFaceDemo fontFace={ displayFontFace } />
                    </VStack>
                </CardBody>
            </Card>
        </div>
    );
}

export default FontCard;