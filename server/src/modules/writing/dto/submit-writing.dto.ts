// src/writing/dto/submit-writing.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitWritingDto {
    @ApiProperty({
        example: 'Some people say that men keep their friends longer than women. Do you agree or disagree?',
        description: 'The topic of the writing',
    })
    @IsString()
    @IsNotEmpty()
    topic: string;

    @ApiProperty({
        example: `Many people think that men might keep their friends longer than women. Personally, I disagree with this statement for two main reasons.\n\nFirstly, women often have emotional connections with their friends, which can help them maintain long-term relationships. Female friendships usually involve sharing personal experiences and supporting each other. For instance, women who grew up together often stay in touch even after they get married or move away.\n\nSecondly, women usually keep in touch with their friends. They often call, text, or meet to talk, even when busy with work or family. Unlike men, who may connect more through activities, women maintain friendships through communication. For example, many women have video calls with their friends even when living far apart.\n\nAll in all, I think women are good at keeping friendships for a long time because they care about feelings and stay in touch. I believe both men and women can have friends for life, but women often try harder to maintain their friendships.`,
        description: 'The text written by the user. Multi-line text is supported.',
    })
    @IsString()
    @IsNotEmpty()
    text: string;
}
